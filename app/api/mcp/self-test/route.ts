import { handleMcpWithQuoteWrites } from "../../../../lib/mcp-write-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Check = {
  name: string;
  pass: boolean;
  detail?: string;
};

function modernRequest(
  method: string,
  params: Record<string, unknown> = {},
  toolName?: string,
) {
  const bodyParams = {
    ...params,
    _meta: {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        name: "USJR self-test",
        version: "1.0.0",
      },
      "io.modelcontextprotocol/clientCapabilities": {},
    },
  };
  return new Request("https://unclesamjunkremoval.com/api/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "MCP-Protocol-Version": "2026-07-28",
      "Mcp-Method": method,
      ...(toolName ? { "Mcp-Name": toolName } : {}),
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params: bodyParams }),
  });
}

async function json(response: Response) {
  return (await response.json().catch(() => ({}))) as Record<string, any>;
}

function quoteArguments(overrides: Record<string, unknown> = {}) {
  return {
    name: "MCP Test Customer",
    phone: "8125550147",
    email: "mcp-test@example.com",
    address: "Evansville, IN 47715",
    items: ["old couch", "queen mattress"],
    service: "Furniture Removal",
    timing: "flexible",
    loadSize: "quarter_load",
    placement: "indoor",
    access: ["stairs"],
    dismantling: false,
    heavyMaterials: false,
    preferredContact: "text",
    notes: "Preview self-test only. Do not send.",
    ...overrides,
  };
}

async function callTool(name: string, args: Record<string, unknown>) {
  return json(
    await handleMcpWithQuoteWrites(
      modernRequest(
        "tools/call",
        { name, arguments: args },
        name,
      ),
    ),
  );
}

export async function GET() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV !== "preview"
  ) {
    return new Response("Not Found", { status: 404 });
  }

  const checks: Check[] = [];

  const discover = await json(
    await handleMcpWithQuoteWrites(modernRequest("server/discover")),
  );
  checks.push({
    name: "modern discovery",
    pass:
      discover.result?.supportedVersions?.includes("2026-07-28") === true &&
      discover.result?.resultType === "complete" &&
      discover.result?.ttlMs > 0 &&
      discover.result?._meta?.["io.modelcontextprotocol/serverInfo"]?.name ===
        "uncle-sam-junk-removal" &&
      /prepareQuoteRequest/.test(discover.result?.instructions || ""),
  });

  const listed = await json(
    await handleMcpWithQuoteWrites(modernRequest("tools/list")),
  );
  const tools = Array.isArray(listed.result?.tools) ? listed.result.tools : [];
  const prepareTool = tools.find((tool: any) => tool.name === "prepareQuoteRequest");
  const submitTool = tools.find((tool: any) => tool.name === "submitQuoteRequest");
  checks.push({
    name: "eight tools with guarded write annotations",
    pass:
      tools.length === 8 &&
      tools.filter((tool: any) => tool.annotations?.readOnlyHint === true).length === 7 &&
      prepareTool?.annotations?.readOnlyHint === true &&
      submitTool?.annotations?.readOnlyHint === false &&
      submitTool?.annotations?.destructiveHint === false &&
      submitTool?.annotations?.idempotentHint === true &&
      submitTool?.annotations?.openWorldHint === true,
  });

  const covered = await callTool("checkServiceArea", { location: "47715" });
  checks.push({
    name: "ZIP 47715 resolves to Evansville",
    pass:
      covered.result?.structuredContent?.status === "covered" &&
      /Evansville/i.test(covered.result?.structuredContent?.community || ""),
  });

  const unknown = await callTool("checkServiceArea", { location: "99999" });
  checks.push({
    name: "unknown ZIP preserves lead",
    pass: unknown.result?.structuredContent?.status === "unknown",
  });

  const quoteLink = await callTool("getQuoteLink", {
    service: "couch",
    location: "47715",
    loadSize: "single_item",
  });
  const quoteUrl = quoteLink.result?.structuredContent?.url || "";
  checks.push({
    name: "quote link carries MCP attribution",
    pass:
      quoteUrl.includes("ref=mcp") &&
      quoteUrl.includes("mcp_source=") &&
      quoteUrl.includes("mcp_trace="),
  });

  const prepared = await callTool("prepareQuoteRequest", quoteArguments());
  const preparedContent = prepared.result?.structuredContent || {};
  checks.push({
    name: "prepare quote validates without submitting",
    pass:
      preparedContent.ok === true &&
      preparedContent.readyToSubmit === true &&
      preparedContent.submitted === false &&
      /^qcf_[a-f0-9]{32}$/.test(preparedContent.confirmationId || "") &&
      preparedContent.serviceArea?.status === "covered",
  });

  const preparedAgain = await callTool("prepareQuoteRequest", quoteArguments());
  checks.push({
    name: "prepare quote confirmation is deterministic",
    pass:
      preparedAgain.result?.structuredContent?.confirmationId ===
      preparedContent.confirmationId,
  });

  const pastDate = await callTool(
    "prepareQuoteRequest",
    quoteArguments({ timing: "choose-date", preferredDate: "2000-01-01" }),
  );
  checks.push({
    name: "past preferred date rejected",
    pass:
      pastDate.result?.structuredContent?.readyToSubmit === false &&
      pastDate.result?.structuredContent?.validationErrors?.some(
        (error: any) => error.code === "past_date",
      ) === true,
  });

  const blockedItem = await callTool(
    "prepareQuoteRequest",
    quoteArguments({ items: ["used needles"] }),
  );
  checks.push({
    name: "not-accepted hauling item blocks ordinary submission",
    pass:
      blockedItem.result?.structuredContent?.readyToSubmit === false &&
      blockedItem.result?.structuredContent?.blockedItems?.some(
        (item: any) => item.verdict === "not_accepted",
      ) === true,
  });

  const guardedSubmit = await callTool("submitQuoteRequest", {
    ...quoteArguments(),
    confirmationId: preparedContent.confirmationId,
    confirmedByCustomer: false,
    consentToContact: true,
  });
  checks.push({
    name: "submit requires explicit customer confirmation",
    pass:
      guardedSubmit.result?.structuredContent?.submitted === false &&
      guardedSubmit.result?.structuredContent?.code ===
        "customer_confirmation_required",
  });

  const mismatchRequest = modernRequest(
    "tools/call",
    { name: "getBusinessInfo", arguments: {} },
    "getBusinessInfo",
  );
  const mismatchHeaders = new Headers(mismatchRequest.headers);
  mismatchHeaders.set("Mcp-Name", "listServices");
  const mismatch = await json(
    await handleMcpWithQuoteWrites(
      new Request(mismatchRequest.url, {
        method: "POST",
        headers: mismatchHeaders,
        body: await mismatchRequest.text(),
      }),
    ),
  );
  checks.push({
    name: "modern header mismatch rejected",
    pass: mismatch.error?.code === -32020,
  });

  const writeMismatchRequest = modernRequest(
    "tools/call",
    { name: "prepareQuoteRequest", arguments: quoteArguments() },
    "prepareQuoteRequest",
  );
  const writeMismatchHeaders = new Headers(writeMismatchRequest.headers);
  writeMismatchHeaders.set("Mcp-Name", "submitQuoteRequest");
  const writeMismatch = await json(
    await handleMcpWithQuoteWrites(
      new Request(writeMismatchRequest.url, {
        method: "POST",
        headers: writeMismatchHeaders,
        body: await writeMismatchRequest.text(),
      }),
    ),
  );
  checks.push({
    name: "write-tool header mismatch rejected",
    pass: writeMismatch.error?.code === -32020,
  });

  const versionMismatchRequest = modernRequest("tools/list");
  const versionMismatchHeaders = new Headers(versionMismatchRequest.headers);
  versionMismatchHeaders.set("MCP-Protocol-Version", "2025-11-25");
  const versionMismatch = await json(
    await handleMcpWithQuoteWrites(
      new Request(versionMismatchRequest.url, {
        method: "POST",
        headers: versionMismatchHeaders,
        body: await versionMismatchRequest.text(),
      }),
    ),
  );
  checks.push({
    name: "protocol header/meta mismatch rejected",
    pass: versionMismatch.error?.code === -32020,
  });

  const unsupported = await json(
    await handleMcpWithQuoteWrites(
      new Request("https://unclesamjunkremoval.com/api/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "MCP-Protocol-Version": "2099-01-01",
          "Mcp-Method": "tools/list",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "tools/list",
          params: {},
        }),
      }),
    ),
  );
  checks.push({
    name: "unsupported protocol reports requested version",
    pass:
      unsupported.error?.code === -32022 &&
      unsupported.error?.data?.requested === "2099-01-01",
  });

  const legacy = await json(
    await handleMcpWithQuoteWrites(
      new Request("https://unclesamjunkremoval.com/api/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "initialize",
          params: {
            protocolVersion: "2025-11-25",
            capabilities: {},
            clientInfo: { name: "legacy-self-test", version: "1.0.0" },
          },
        }),
      }),
    ),
  );
  checks.push({
    name: "legacy initialize compatibility",
    pass:
      legacy.result?.protocolVersion === "2025-11-25" &&
      legacy.result?.serverInfo?.name === "uncle-sam-junk-removal" &&
      legacy.result?.serverInfo?.version === "1.2.0" &&
      /submitQuoteRequest/.test(legacy.result?.instructions || ""),
  });

  const passed = checks.filter((check) => check.pass).length;
  return Response.json(
    {
      ok: passed === checks.length,
      passed,
      total: checks.length,
      checks,
    },
    {
      status: passed === checks.length ? 200 : 500,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

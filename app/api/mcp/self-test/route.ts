import { handleMcpPost } from "../../../../lib/mcp-server";

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

export async function GET() {
  if (process.env.VERCEL_ENV === "production") {
    return new Response("Not Found", { status: 404 });
  }

  const checks: Check[] = [];

  const discover = await json(
    await handleMcpPost(modernRequest("server/discover")),
  );
  checks.push({
    name: "modern discovery",
    pass:
      discover.result?.supportedVersions?.includes("2026-07-28") === true &&
      discover.result?.resultType === "complete" &&
      discover.result?.ttlMs > 0 &&
      discover.result?._meta?.["io.modelcontextprotocol/serverInfo"]?.name ===
        "uncle-sam-junk-removal",
  });

  const listed = await json(await handleMcpPost(modernRequest("tools/list")));
  checks.push({
    name: "six read-only tools",
    pass:
      listed.result?.tools?.length === 6 &&
      listed.result?.tools?.every(
        (tool: any) =>
          tool.annotations?.readOnlyHint === true &&
          tool.annotations?.destructiveHint === false &&
          typeof tool.title === "string",
      ),
  });

  const covered = await json(
    await handleMcpPost(
      modernRequest(
        "tools/call",
        { name: "checkServiceArea", arguments: { location: "47715" } },
        "checkServiceArea",
      ),
    ),
  );
  checks.push({
    name: "ZIP 47715 resolves to Evansville",
    pass:
      covered.result?.structuredContent?.status === "covered" &&
      /Evansville/i.test(covered.result?.structuredContent?.community || ""),
  });

  const unknown = await json(
    await handleMcpPost(
      modernRequest(
        "tools/call",
        { name: "checkServiceArea", arguments: { location: "99999" } },
        "checkServiceArea",
      ),
    ),
  );
  checks.push({
    name: "unknown ZIP preserves lead",
    pass: unknown.result?.structuredContent?.status === "unknown",
  });

  const quoteLink = await json(
    await handleMcpPost(
      modernRequest(
        "tools/call",
        {
          name: "getQuoteLink",
          arguments: {
            service: "couch",
            location: "47715",
            loadSize: "single_item",
          },
        },
        "getQuoteLink",
      ),
    ),
  );
  const quoteUrl = quoteLink.result?.structuredContent?.url || "";
  checks.push({
    name: "quote link carries MCP attribution",
    pass:
      quoteUrl.includes("ref=mcp") &&
      quoteUrl.includes("mcp_source=") &&
      quoteUrl.includes("mcp_trace="),
  });

  const mismatchRequest = modernRequest(
    "tools/call",
    { name: "getBusinessInfo", arguments: {} },
    "getBusinessInfo",
  );
  const mismatchHeaders = new Headers(mismatchRequest.headers);
  mismatchHeaders.set("Mcp-Name", "listServices");
  const mismatch = await json(
    await handleMcpPost(
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

  const legacy = await json(
    await handleMcpPost(
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
      legacy.result?.serverInfo?.name === "uncle-sam-junk-removal",
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

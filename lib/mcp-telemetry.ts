type McpClientInfo = {
  family: string;
  name: string;
  version: string;
};

type TelemetryFields = Record<
  string,
  string | number | boolean | null | undefined
>;

const MAX_CLIENT_LABEL = 80;

function clean(value: unknown, max = MAX_CLIENT_LABEL) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function clientFamily(name: string, userAgent: string) {
  const haystack = `${name} ${userAgent}`.toLowerCase();
  if (/chatgpt|openai|codex/.test(haystack)) return "openai";
  if (/claude|anthropic/.test(haystack)) return "anthropic";
  if (/modelcontextprotocol|mcp inspector|inspector/.test(haystack)) {
    return "mcp-inspector";
  }
  if (/cursor/.test(haystack)) return "cursor";
  if (/vscode|visual studio code/.test(haystack)) return "vscode";
  return name ? "other-mcp-client" : "unknown";
}

export function getMcpClientInfo(
  request: Request,
  body?: Record<string, any>,
): McpClientInfo {
  const meta = body?.params?._meta;
  const modern =
    meta && typeof meta === "object"
      ? meta["io.modelcontextprotocol/clientInfo"]
      : undefined;
  const legacy = body?.method === "initialize" ? body?.params?.clientInfo : undefined;
  const candidate =
    modern && typeof modern === "object"
      ? modern
      : legacy && typeof legacy === "object"
        ? legacy
        : undefined;

  const name = clean(candidate?.name) || "unknown";
  const version = clean(candidate?.version, 40) || "unknown";
  const userAgent = clean(request.headers.get("user-agent"), 200);

  return {
    family: clientFamily(name, userAgent),
    name,
    version,
  };
}

export function newMcpTraceId() {
  return crypto.randomUUID();
}

export function logMcpEvent(event: string, fields: TelemetryFields = {}) {
  const payload = Object.fromEntries(
    Object.entries({
      type: "usjr_mcp_telemetry",
      event,
      at: new Date().toISOString(),
      ...fields,
    }).filter(([, value]) => value !== undefined),
  );

  // Structured JSON is intentionally the persistence layer for now. Vercel
  // runtime logs can aggregate these without introducing a customer database.
  console.info(JSON.stringify(payload));
}

export function sanitizeMcpSource(value: unknown) {
  const source = clean(value, 80).toLowerCase();
  return /^[a-z0-9._:-]{1,80}$/.test(source) ? source : "unknown";
}

export function sanitizeMcpTrace(value: unknown) {
  const trace = clean(value, 80);
  return /^[a-zA-Z0-9._:-]{8,80}$/.test(trace) ? trace : "";
}

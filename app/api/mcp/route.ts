import { trackMcpHttpRequest } from "../../../lib/amplitude-mcp";
import {
  handleMcpGet,
  handleMcpOptions,
} from "../../../lib/mcp-server";
import { handleMcpWithQuoteWrites } from "../../../lib/mcp-write-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function OPTIONS(request: Request) {
  return handleMcpOptions(request);
}

export function GET(request: Request) {
  return handleMcpGet(request);
}

export const DELETE = GET;

export function POST(request: Request) {
  return trackMcpHttpRequest(request, () => handleMcpWithQuoteWrites(request));
}

import {
  handleMcpGet,
  handleMcpOptions,
} from "../../../lib/mcp-server";
import { handleMcpWithQuoteWrites } from "../../../lib/mcp-write-tools";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function OPTIONS() {
  return handleMcpOptions();
}

export function GET() {
  return handleMcpGet();
}

export const DELETE = GET;

export function POST(request: Request) {
  return handleMcpWithQuoteWrites(request);
}

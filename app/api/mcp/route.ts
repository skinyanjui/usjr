import {
  handleMcpGet,
  handleMcpOptions,
} from "../../../lib/mcp-server";
import { handleCompatibleMcpPost } from "../../../lib/mcp-request-compat";

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
  return handleCompatibleMcpPost(request);
}

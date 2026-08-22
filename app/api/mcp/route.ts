import {
  handleMcpGet,
  handleMcpOptions,
  handleMcpPost,
} from "../../../lib/mcp-server";

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
  return handleMcpPost(request);
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createTaskboard } from "@/app/lib/taskBoardActions";

export const middleware = async (request: NextRequest) => {
  /**
   * Create a taskboard if visitng "/" and redirect to it.
   */
  const taskboardId = await createTaskboard();

  return NextResponse.redirect(new URL(`/${taskboardId}`, request.url));
};

export const config = { matcher: "/" };

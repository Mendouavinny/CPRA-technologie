import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ isAdmin: await isAdminRequest() });
}

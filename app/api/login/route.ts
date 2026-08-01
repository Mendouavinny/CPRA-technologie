import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminCode, sessionToken } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (code === getAdminCode()) {
      const response = NextResponse.json({ ok: true });
      response.cookies.set(ADMIN_COOKIE, sessionToken(), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 jours
      });
      return response;
    }
    return NextResponse.json({ ok: false }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

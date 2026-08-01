import { NextResponse } from "next/server";
import { resetStore } from "@/lib/server-store";
import { isAdminRequest } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  await resetStore();
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import {
  addApplication,
  deleteApplication,
  getApplications,
} from "@/lib/server-store";
import { isAdminRequest } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  return NextResponse.json(await getApplications());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const record = await addApplication({
      name: String(body.name ?? ""),
      email: String(body.email ?? ""),
      phone: String(body.phone ?? ""),
      type: String(body.type ?? "Emploi"),
      position: String(body.position ?? ""),
      message: String(body.message ?? ""),
    });
    return NextResponse.json(record);
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    await deleteApplication(id);
  }
  return NextResponse.json({ ok: true });
}

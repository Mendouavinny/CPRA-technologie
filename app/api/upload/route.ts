import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "data", "uploads");
const MAX_BYTES = 6 * 1024 * 1024; // 6 Mo

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Image trop volumineuse (max 6 Mo)" },
        { status: 400 }
      );
    }

    const ext = EXT_BY_TYPE[file.type] ?? "jpg";
    const rand = Math.random().toString(36).slice(2, 10);
    const name = `${Date.now()}-${rand}.${ext}`;

    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(UPLOADS_DIR, name), bytes);

    return NextResponse.json({ url: `/api/uploads/${name}` });
  } catch {
    return NextResponse.json(
      { error: "Envoi de l'image impossible" },
      { status: 400 }
    );
  }
}

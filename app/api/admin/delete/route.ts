
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sb } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  const isAdmin = cookies().get("nafas_admin")?.value === "ok";
  if (!isAdmin) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "مفقود" }, { status: 400 });

  const { error } = await sb.from("messages").update({ deleted: true }).eq("id", id);
  if (error) return NextResponse.json({ error: "فشل الحذف" }, { status: 500 });

  return NextResponse.json({ ok: true });
}

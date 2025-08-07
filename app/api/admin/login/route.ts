
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const password = body?.password || "";
  const adminPass = process.env.ADMIN_PASSWORD || "";
  if (!adminPass) {
    return NextResponse.json({ error: "لم يتم ضبط كلمة السر" }, { status: 500 });
  }
  if (password !== adminPass) {
    return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
  }
  cookies().set("nafas_admin", "ok", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return NextResponse.json({ ok: true });
}

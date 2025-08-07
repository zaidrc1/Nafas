
import { NextRequest, NextResponse } from "next/server";
import { sb } from "@/lib/supabaseAdmin";
import { sanitizeText } from "@/lib/sanitize";
import crypto from "crypto";

function hashIp(ip: string, salt: string) {
  const h = crypto.createHash("sha256");
  h.update(ip + salt);
  return h.digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { text, recipient } = await req.json();
    const t = typeof text === "string" ? sanitizeText(text) : "";
    const r = typeof recipient === "string" ? sanitizeText(recipient) : "";
    if (!t || t.length < 1 || t.length > 2000) {
      return NextResponse.json({ error: "النص غير صالح" }, { status: 400 });
    }
    if (r && r.length > 80) {
      return NextResponse.json({ error: "الاسم طويل" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
    const salt = process.env.RATE_SALT || "nafas_salt";
    const ipHash = hashIp(ip, salt);

    const since = new Date(Date.now() - 60_000).toISOString();
    const { count } = await sb
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since)
      .eq("deleted", false);
    if ((count ?? 0) >= 3) {
      return NextResponse.json({ error: "حاول لاحقًا." }, { status: 429 });
    }

    const { error } = await sb.from("messages").insert({
      text: t,
      recipient: r || null,
      deleted: false,
      ip_hash: ipHash
    });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "خطأ في الإرسال" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const recipient = (searchParams.get("recipient") || "").trim();
    let query = sb.from("messages").select("id, text, recipient, created_at").eq("deleted", false);
    if (recipient) {
      // ILIKE contains match
      query = query.ilike("recipient", f"%{recipient}%");
    }
    const { data, error } = await query.order("created_at", { ascending: false }).limit(100);
    if (error) throw error;
    return NextResponse.json({ items: data });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

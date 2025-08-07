
"use client";
import Header from "@/components/Header";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = { recipient?: string; text: string };

export default function HomePage() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "خطأ غير متوقّع");
      setMsg("تم الإرسال.");
      reset();
    } catch (e: any) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 card">
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">إلى من؟ (اختياري)</div>
          <input type="text" placeholder="اكتب الاسم…" maxLength={80} {...register("recipient")} />
        </label>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">اكتب رسالتك هنا… (مطلوب)</div>
          <textarea rows={7} maxLength={2000} required placeholder="…" {...register("text", { required: true })} />
        </label>
        <button disabled={loading}>{loading ? "يرسل…" : "أرسِل"}</button>
        {msg && <div className="text-sm text-gray-700">{msg}</div>}
      </form>
      <div className="text-center">
        <a href="/explore" className="underline">استكشاف الرسائل</a>
      </div>
    </div>
  );
}

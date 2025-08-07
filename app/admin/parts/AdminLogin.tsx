
"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "فشل الدخول");
      window.location.reload();
    } catch (e: any) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">لوحة الإدارة</h2>
      <form onSubmit={submit} className="card space-y-3 max-w-md">
        <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} />
        <button disabled={loading}>{loading ? "يدخل…" : "دخول"}</button>
        {msg && <div className="text-sm text-red-600">{msg}</div>}
      </form>
    </div>
  );
}

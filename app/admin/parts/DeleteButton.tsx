
"use client";
import { useState } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const del = async () => {
    if (!confirm("حذف الرسالة؟")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error("فشل الحذف");
      window.location.reload();
    } catch (e) {
      alert("خطأ.");
    } finally {
      setLoading(false);
    }
  };
  return <button onClick={del} disabled={loading}>{loading ? "يحذف…" : "حذف"}</button>;
}


import { sb } from "@/lib/supabaseAdmin";
import DeleteButton from "./DeleteButton";

export default async function AdminTable() {
  const { data, error } = await sb
    .from("messages")
    .select("*")
    .eq("deleted", false)
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    return <div className="text-red-600">خطأ في التحميل.</div>;
  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">لوحة الإدارة</h2>
      <div className="grid gap-3">
        {data!.map((m) => (
          <div key={m.id} className="card">
            <div className="text-xs text-gray-500 mb-2">{m.id}</div>
            {m.recipient && <div className="text-sm text-gray-600 mb-1">إلى: <b>{m.recipient}</b></div>}
            <div className="whitespace-pre-wrap mb-2">{m.text}</div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>{new Date(m.created_at).toLocaleString("ar-SA")}</div>
              <DeleteButton id={m.id} />
            </div>
          </div>
        ))}
        {data!.length === 0 && <div className="text-gray-500">لا رسائل.</div>}
      </div>
    </div>
  );
}

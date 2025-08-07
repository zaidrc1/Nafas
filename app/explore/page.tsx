
import Header from "@/components/Header";
import { MessageCard } from "@/components/MessageCard";

async function getMessages(search: string) {
  const url = search ? `/api/messages?recipient=${encodeURIComponent(search)}` : `/api/messages`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("failed");
  const data = await res.json();
  return data.items as any[];
}

export default async function ExplorePage({ searchParams }: { searchParams: { recipient?: string } }) {
  const search = searchParams?.recipient?.toString() || "";
  const items = await getMessages(search);
  return (
    <div className="space-y-6">
      <Header />
      <form method="GET" className="card space-y-3">
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">ابحث باسم المُرسَل إليه</div>
          <input name="recipient" defaultValue={search} placeholder="مثال: خالد" />
        </label>
        <button type="submit">بحث</button>
      </form>

      <div className="space-y-3">
        {items.length === 0 && <div className="text-gray-500">لا توجد رسائل بعد.</div>}
        {items.map((m) => <MessageCard key={m.id} m={m} />)}
      </div>
    </div>
  );
}

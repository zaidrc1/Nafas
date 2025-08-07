
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
dayjs.extend(relativeTime);
dayjs.locale("ar");

export function MessageCard({ m }: { m: any }) {
  return (
    <article className="card space-y-2">
      {m.recipient && (
        <div className="text-sm text-gray-500">
          إلى: <span className="font-medium">{m.recipient}</span>
        </div>
      )}
      <div className="whitespace-pre-wrap leading-7">{m.text}</div>
      <div className="text-xs text-gray-400">{dayjs(m.created_at).fromNow()}</div>
    </article>
  );
}

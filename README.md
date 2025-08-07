
# نَفَس — رسائل لم تُرسَل (Next.js + Supabase)

موقع بسيط بالعربي لكتابة رسائل مجهولة، مع صفحة استكشاف ولوحة إدارة.

## المتطلبات
- حساب Supabase
- حساب Vercel

## إنشاء قاعدة البيانات (Supabase)
1) أنشئ مشروع جديد.
2) افتح SQL Editor والصق الكود التالي ثم شغّله:

```
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  text text not null check (char_length(text) <= 2000),
  recipient text,
  created_at timestamptz not null default now(),
  deleted boolean not null default false,
  ip_hash text
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);
create index if not exists messages_recipient_idx on public.messages (lower(recipient));
```
> لو ظهر خطأ بخصوص gen_random_uuid فعّل امتداد pgcrypto من Database → Extensions.

> لا نستخدم RLS لأن العمليات تتم بمفتاح الخدمة من السيرفر.

## الإعدادات (Vercel → Settings → Environment Variables)
- ADMIN_PASSWORD = كلمة المرور للوحة الإدارة
- SUPABASE_URL = من صفحة مشروع Supabase
- SUPABASE_SERVICE_ROLE_KEY = من Project Settings → API (Service role key)
- RATE_SALT = سلسلة عشوائية (لهاش IP)
- NEXT_PUBLIC_BASE_URL = (اختياري)

ثم اضغط Deploy.

## تشغيل محلي (اختياري)
```
npm install
npm run dev
```
ثم افتح: http://localhost:3000

## الصفحات
- /  كتابة رسالة
- /explore  استكشاف الرسائل
- /admin  إدارة (تحتاج كلمة مرور)

## ملاحظات
- تنظيف النص ومنع HTML.
- حد أقصى 2000 حرف.
- تحديد بسيط: 3 رسائل/دقيقة لكل IP.
- الحذف ناعم (soft).

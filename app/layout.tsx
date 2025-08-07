
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "نَفَس — رسائل لم تُرسَل",
  description: "مساحة آمنة لرسائل لم تُرسَل."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <main className="container px-4 py-6">{children}</main>
      </body>
    </html>
  );
}

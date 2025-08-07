
import { isAdmin } from "@/lib/auth";
import AdminLogin from "./parts/AdminLogin";
import AdminTable from "./parts/AdminTable";

export default async function AdminPage() {
  const ok = isAdmin();
  if (!ok) return <AdminLogin />;
  return <AdminTable />;
}

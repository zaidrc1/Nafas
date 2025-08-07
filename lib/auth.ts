
import { cookies } from "next/headers";

export function isAdmin() {
  const c = cookies().get("nafas_admin");
  return Boolean(c?.value === "ok");
}

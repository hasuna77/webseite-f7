import { getSession } from "@/lib/auth/session";
import { business } from "@/lib/content/business";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const session = await getSession();
  return <HeaderClient session={session} businessName={business.name} />;
}

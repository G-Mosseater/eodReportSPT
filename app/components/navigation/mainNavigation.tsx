import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import MainNavigationClient from "./mainNavigationClient";

export default async function MainNavigation() {
  const session = await getServerSession(authOptions);

  return  <MainNavigationClient session={session} />;
}

import { Metadata } from "next";
import UsersMfa from "../../ui/Users_mfa/UsersMfa";

export const metadata: Metadata = {
  title: "Users Multi-Factor Authentication",
};

export default async function Page() {
  return (
    <main className="h-full w-full flex items-center justify-center">
      <UsersMfa />
    </main>
  );
}

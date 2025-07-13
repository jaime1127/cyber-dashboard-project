import { Metadata } from "next";
import FailedLogins from "../../ui/User_Failed_Logins/FailedLogins";

export const metadata: Metadata = {
  title: "Email",
};

export default async function Page() {
  return (
    <main>
      <FailedLogins/>
    </main>
  );
}

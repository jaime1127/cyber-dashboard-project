import { Metadata } from "next";
import FailedLogins from "../../ui/User_Failed_Logins/FailedLogins";

export const metadata: Metadata = {
  title: "User Failed Logins",
};

export default async function Page() {
  return (
    <main className="h-full w-full flex items-center justify-center">
      <FailedLogins />
    </main>
  );
}

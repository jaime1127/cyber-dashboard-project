import { Metadata } from "next";
import EmailData from "../../ui/Email/EmailData";

export const metadata: Metadata = {
  title: "Email Data",
};

export default async function Page() {
  return (
    <main className="h-full w-full flex items-center justify-center">
      <EmailData />
    </main>
  );
}

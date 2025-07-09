import GlobeClientWrapper from "../ui/Globe/GlobeWrapper";
import Dashboard from "../ui/Dashboard";
import { getAllData } from "./lib/data";

const data = await getAllData();

export default function Page() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}

import GlobeClientWrapper from "../ui/Globe/GlobeWrapper";
import Dashboard from "../ui/Dashboard";
import { getAllData } from "./lib/data";

const data = await getAllData();
console.log(data);

export default function Page() {
  return (
    <main>
      {/* <GlobeClientWrapper /> */}
      <Dashboard />
    </main>
  );
}

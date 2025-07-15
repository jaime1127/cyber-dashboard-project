"use client";

import General from "../ui/General/General";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const componentsMap: Record<string, React.ElementType> = {
  "/failed-logins": dynamic(
    () => import("../ui/User_Failed_Logins/FailedLogins")
  ),
  "/malware": dynamic(() => import("../ui/Malware/Malware")),
};

export default function Page() {
  const pathname = usePathname();
  const DynamicComponent = componentsMap[pathname];

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
      {pathname === "/" && (
        <div className="flex-1">
          <General />
        </div>
      )}
      {DynamicComponent && <DynamicComponent />}
    </div>
  );
}

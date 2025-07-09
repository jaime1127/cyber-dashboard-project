"use client";

import dynamic from "next/dynamic";

// Dynamically import your Globe component with SSR disabled
const ThreeDGlobe = dynamic(() => import("./Global"), { ssr: false });

export default function GlobeClientWrapper() {
  return <ThreeDGlobe />;
}
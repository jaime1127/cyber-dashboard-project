"use client";

import { Chart, registerables } from "chart.js";
import { getGeneral } from "../../app/lib/data";
import { useEffect, useRef, useState } from "react";

Chart.register(...registerables);

const labelMap: Record<string, string> = {
  missing_patches: "Missing Patches",
  login_30_days: "Logins (30 Days)",
  firewall_blocks: "Firewall Blocks",
};

export default function General() {
  const [data, setData] = useState<any | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    getGeneral().then(setData);
  }, []);

  useEffect(() => {
    console.log("Data for General Overview:", data);
    if (data && chartRef.current) {
      // Destroy previous chart instance if exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const values = data.map((item: any) => item.threat_count);
      const labels = data.map((item: any) => item.category);

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: { display: true, text: "Overview of Threat Counts" },
          },
          scales: {
            x: { ticks: { color: "#fff" } },
            y: { ticks: { color: "#fff" } },
          },
        },
      });
    }

    // Cleanup: destroy chart on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data]);

  return (
    <main className="flex flex-col items-center justify-center h-full w-full">
      <div className="w-full h-full flex flex-row bg-white/5 rounded-lg shadow-lg overflow-hidden divide-x divide-gray-200">
        <div className="px-4 py-5 sm:px-6 flex flex-col justify-center">
          <p className="text-base/7 font-semibold text-white">
            General Overview
          </p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Overview of general statistics and trends.
          </p>
        </div>
        <div className="flex-1 flex items-center  px-4 py-5 sm:p-6 h-full">
          <div className="w-1/3 h-full">
            <canvas ref={chartRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </main>
  );
}

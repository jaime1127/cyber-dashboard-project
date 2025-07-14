"use client";

import { Chart, registerables } from "chart.js";
import { getGeneral } from "../../app/lib/data";
import { useEffect, useRef, useState } from "react";

Chart.register(...registerables);

type GeneralItem = {
  category: string;
  threat_count: number;
};

export default function General() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [generalItems, setGeneralItems] = useState<GeneralItem[]>([]);

  useEffect(() => {
    getGeneral().then((items) => {
      setGeneralItems(items);
    });
  }, []);

  useEffect(() => {
    if (generalItems.length > 0 && chartRef.current) {
      // Destroy previous chart instance if exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const values = generalItems.map((item: GeneralItem) => item.threat_count);
      const labels = generalItems.map((item: GeneralItem) => item.category);

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
  }, [generalItems]);

  return (
    <main className="flex flex-col items-center justify-center h-full w-full">
      <div className="w-full h-full flex flex-col lg:flex-row bg-white/5 rounded-lg shadow-lg overflow-hidden divide-x divide-gray-200">
        <div className="px-4 py-5 sm:px-6 flex flex-col justify-center">
          <p className="text-base/7 font-semibold text-white">
            General Overview
          </p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Overview of general statistics and trends.
          </p>
        </div>
        <div className="flex-1 flex items-center  px-4 py-5 sm:p-6 h-full">
          <div className="w-full lg:w-1/3 h-full">
            <canvas ref={chartRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </main>
  );
}

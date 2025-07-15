"use client";

import { Chart, registerables } from "chart.js";
import { getEmail } from "../../app/lib/data";
import { useEffect, useRef, useState } from "react";

Chart.register(...registerables);

type EmailItem= {
  category: string;
  threat_count: number;
};

const insightsData: Array<{ type: string; insight: string }> = [
  {
    type: "Spam",
    insight: "Spam emails are the most common threat category, with 19 threats detected this month.",
  },
  {
    type: "Malware",
    insight: "Malware emails have seen 29 threats detected this month, posing significant risks.",
  },
  {
    type: "Phishing",
    insight: "Phishing emails are prevalent, with 23 threats detected this month targeting sensitive information.",
  },
];

export default function EmailData() {
  const [data, setData] = useState<EmailItem[] | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    getEmail().then(setData);
  }, []);

  useEffect(() => {
    if (data && chartRef.current) {
      // Destroy previous chart instance if exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const labels = data.map((item: EmailItem) => item.category);
      const values = data.map((item: EmailItem) => item.threat_count);

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              label: "Malware Attacks",
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
    <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="w-full h-full flex flex-col lg:flex-row bg-white/5 rounded-lg shadow-lg overflow-hidden divide-x divide-gray-200">
            <div className="px-4 py-5 sm:px-6 flex flex-col justify-center">
              <p className="text-base/7 font-semibold text-white">
                Users Email Overview
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Overview of email statistics and trends.
              </p>
            </div>
            <div className="flex-1 flex items-center px-4 py-5 sm:p-6 h-full">
              <div className="w-full h-full">
                <canvas ref={chartRef} className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white/5 text-gray-900 rounded-lg shadow-lg p-6">
        <div className="w-full">
          <h2 className="text-base/7 font-semibold text-white">AI Insights</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-white/5">
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-300">
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-300">
                  Insight
                </th>
              </tr>
            </thead>
            <tbody>
              {insightsData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white/20" : "bg-white/10"}
                >
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-300">
                    {item.type}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-white">
                    {item.insight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

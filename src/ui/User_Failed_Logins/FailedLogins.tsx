"use client";

import { Chart, registerables } from "chart.js";
import { getUserFailLogin } from "../../app/lib/data";
import { useEffect, useRef, useState } from "react";

Chart.register(...registerables);

type FailedLoginItem = {
  username: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
};

type FailedLoginData = {
  failed_logins: FailedLoginItem[];
};

const insightsData: Array<{ type: string; insight: string }> = [
  {
    type: "WKS-EMR01",
    insight:
      "Failed logins from WKS-EMR01: Jan (15), Feb (12), Mar (24), Apr (40), May (34).",
  },
  {
    type: "LPT-ALK23",
    insight:
      "Failed logins from LPT-ALK23: Jan (23), Feb (43), Mar (67), Apr (54), May (23).",
  },
  {
    type: "SRV-COL98",
    insight:
      "Failed logins from SRV-COL98: Jan (11), Feb (76), Mar (34), Apr (98), May (76).",
  },
  {
    type: "PC-HSD44",
    insight:
      "Failed logins from PC-HSD44: Jan (45), Feb (11), Mar (23), Apr (87), May (78).",
  },
];

export default function Failed() {
  const [data, setData] = useState<FailedLoginData | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // Reference to the chart instance

  useEffect(() => {
    getUserFailLogin().then((result) => {
      setData({ failed_logins: result });
    });
  }, []);

  useEffect(() => {
    if (data && chartRef.current) {
      // Destroy the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Extract labels (months) from the first item in the data
      const labels = ["Jan", "Feb", "Mar", "Apr", "May"];

      // Define a list of colors for datasets
      const colors = [
        {
          background: "rgba(255, 99, 132, 0.2)",
          border: "rgba(255, 99, 132, 1)",
        },
        {
          background: "rgba(54, 162, 235, 0.2)",
          border: "rgba(54, 162, 235, 1)",
        },
        {
          background: "rgba(255, 206, 86, 0.2)",
          border: "rgba(255, 206, 86, 1)",
        },
        {
          background: "rgba(75, 192, 192, 0.2)",
          border: "rgba(75, 192, 192, 1)",
        },
      ];

      // Extract datasets for each user
      const datasets = data.failed_logins.map((item: FailedLoginItem, index) => ({
        label: item.username,
        data: [
          item?.jan || 0,
          item?.feb || 0,
          item?.mar || 0,
          item?.apr || 0,
          item?.may || 0,
        ],
        backgroundColor: colors[index % colors.length].background, // Assign background color
        borderColor: colors[index % colors.length].border, // Assign border color
        borderWidth: 2,
      }));

      // Create a new chart instance
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels, // Months as labels
          datasets, // User data as datasets
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            title: {
              display: true,
              text: "User Failed Logins",
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="w-full h-full flex flex-col lg:flex-row bg-white/5 rounded-lg shadow-lg overflow-hidden divide-x divide-gray-200">
            <div className="px-4 py-5 sm:px-6 flex flex-col justify-center">
              <p className="text-base/7 font-semibold text-white">
                User Failed Logins Overview
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Overview of user failed login statistics and trends.
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

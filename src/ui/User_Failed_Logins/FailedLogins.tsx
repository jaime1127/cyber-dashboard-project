"use client";

import { Chart, registerables } from "chart.js";
import { getUserFailLogin } from "../../app/lib/data";
import { useEffect, useRef, useState } from "react";

Chart.register(...registerables);

type FailedLoginItem = {
  category: string;
  threat_count: number;
};

type FailedLoginData = {
  failed_logins: FailedLoginItem[];
};

export default function Failed() {
  const [data, setData] = useState<FailedLoginData | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    getUserFailLogin().then((failed_logins) => setData({ failed_logins }));
  }, []);

  useEffect(() => {
    if (data && chartRef.current) {
      const labels = data.failed_logins.map(
        (item: FailedLoginItem) => item.category
      );
      const values = data.failed_logins.map(
        (item: FailedLoginItem) => item.threat_count
      );

      new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "User Failed Logins",
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
              borderWidth: 2,
            },
          ],
        },
      });
    }
  }, [data]);

  return (
    <main>
      <div className="w-56 h-56">
        <canvas ref={chartRef} className="w-full h-full" />
      </div>
    </main>
  );
}

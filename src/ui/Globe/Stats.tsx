"use client";

import { useEffect, useState } from "react";
import { getAllData } from "../../app/lib/data";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

type AttackCountry = {
  country: string;
  day: number;
  hour: number;
};

type StatsData = {
  attacks_by_country: AttackCountry[];
};

export default function Stats() {
  const [data, setData] = useState<StatsData | null>(null);

  useEffect(() => {
    getAllData().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  const convertHourToDateOnly = (hours: number) => {
    const milliseconds = hours * 60 * 60 * 1000; // hours to ms
    const date = new Date(milliseconds);
    return date.toLocaleDateString(); // e.g., "7/9/2025"
  };

  return (
    <main>
      {data.attacks_by_country.map((data: AttackCountry) => (
        <div key={data.country}>
          <div className="flex flex-row gap-4 p-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            <p className="text-md text-gray-50 ">Warning</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-lg  bg-white/5">
            <div className="text-md  text-gray-50 font-urbanist">
              {data.country}
            </div>
            <div className="w-full flex-none text-1xl/10 font-medium tracking-tight text-gray-50">
              Attacked on {convertHourToDateOnly(data.day)}
            </div>
            <div className="w-full flex-none text-1xl/10 font-medium tracking-tight text-gray-50">
              Time {convertHourToDateOnly(data.hour)}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

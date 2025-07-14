"use client";

import { useEffect, useState } from "react";
import { getAttacksByCountry } from "../../app/lib/data";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { RU, IN, CN, PK, DE } from "country-flag-icons/react/3x2";
import Link from "next/link";

type AttackCountry = {
  country: string;
  day: number;
  hour: number;
};

type StatsData = {
  attacks_by_country: AttackCountry[];
};

export default function Attack_By_Login() {
  const [data, setData] = useState<StatsData | null>(null);

  useEffect(() => {
    getAttacksByCountry().then((attacks) =>
      setData({ attacks_by_country: attacks })
    );
  }, []);

  if (!data) return <div>Loading...</div>;

  const convertHourToDateOnly = (hours: number) => {
    const milliseconds = hours * 60 * 60 * 1000; // hours to ms
    const date = new Date(milliseconds);
    return date.toLocaleDateString(); // e.g., "7/9/2025"
  };

  const flagMap: Record<string, React.ElementType> = {
    russia: RU,
    india: IN,
    china: CN,
    pakistan: PK,
    germany: DE,
  };

  return (
    <main>
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-white">
          Attacks by Country
        </h2>
      </header>
      <div className="px-4 py-2 text-sm text-gray-300">
        Shows recent cyber attacks by country, including the affected region,
        date, and time. Use this data to spot global threat patterns and
        high-risk areas.
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-200"
      >
        {data.attacks_by_country.map((data: AttackCountry) => {
          const FlagIcon = flagMap[data.country];
          return (
            <li
              key={data.country}
              className="flex justify-between gap-x-6 p-4 flex-col items-center"
            >
              <div className="flex flex-row gap-4 p-4 overflow-y-auto">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                <p className="text-md text-gray-50 ">Danger</p>
              </div>
              <div className="flex min-w-0 gap-x-6 items-center ">
                {FlagIcon ? (
                  <FlagIcon className="size-14 flex-none rounded-full bg-white/5" />
                ) : (
                  <div className="size-14 flex-none rounded-full bg-gray-800 text-white flex items-center justify-center">
                    ?
                  </div>
                )}
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-400">
                    Country: {data.country}
                  </p>
                  <div className="w-full flex-none text-1xl/10 font-medium tracking-tight text-gray-50">
                    Attacked on: {convertHourToDateOnly(data.day)}
                  </div>
                  <div className="w-full flex-none text-1xl/10 font-medium tracking-tight text-gray-50">
                    Time: {convertHourToDateOnly(data.hour)}
                  </div>
                </div>
                <Link
                  href={data.country}
                  className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  View
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

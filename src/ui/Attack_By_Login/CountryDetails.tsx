"use client";

import { useEffect, useState } from "react";
import { getAttacksBySingleCountry } from "../../app/lib/data";

import { RU, IN, CN, PK, DE } from "country-flag-icons/react/3x2";

interface CountryDetailsProps {
  country: string;
  onClick: (country: string | null) => void; // Allow null for resetting
}

interface AttackData {
  day: string;
  hour: number;
}

export default function CountryDetails({
  country,
  onClick,
}: CountryDetailsProps) {
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

  const [data, setData] = useState<AttackData[] | null>(null);

  useEffect(() => {
    getAttacksBySingleCountry(country).then((attacks) => {
      if (Array.isArray(attacks)) {
        setData(attacks);
      } else {
        console.error("Unexpected data format:", attacks);
        setData([]);
      }
    });
  }, [country]);

  if (!data) return <div>Loading...</div>;

  if (!Array.isArray(data)) {
    return <div>Error: Unexpected data format</div>;
  }
  const FlagIcon = flagMap[country];
  return (
    <main className="w-full">
      <header className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base/7 font-semibold text-white">
          {country.toUpperCase()} Attacks Details
        </h2>
        <button
          onClick={() => onClick(null)} // Set to null
          className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Return
        </button>
      </header>
      <div className="px-4 py-2 text-sm text-gray-300">
        Shows logs of cyber attacks from {country.toUpperCase()}. Use this data
        to analyze attack patterns and trends specific to this country.
      </div>
      <FlagIcon className="bg-white/5 w-3/4 mx-auto block" />
      <div className="shadow-lg backdrop-blur-sm bg-white/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Day
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Hour
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {data.map((data, index) => (
                      <tr key={index}>
                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-white sm:pl-0">
                          {data.day}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-300">
                          {convertHourToDateOnly(data.hour)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

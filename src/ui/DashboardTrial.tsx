"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  XMarkIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

import GlobeClientWrapper from "./Globe/GlobeWrapper";
import Stats from "./Globe/Stats";
import Link from "next/link";
import Image from "next/image";

const navigation = [
  { name: "Attacks By Country", href: "#", icon: FolderIcon, current: false },
  { name: "Failed User Logins", href: "#", icon: ServerIcon, current: true },
  { name: "General", href: "#", icon: SignalIcon, current: false },
  { name: "users_mfa ", href: "#", icon: GlobeAltIcon, current: false },
  { name: "Email", href: "#", icon: ChartBarSquareIcon, current: false },
  { name: "Malware", href: "#", icon: Cog6ToothIcon, current: false },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 backdrop-blur-sm bg-white/10 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>

              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 ring-1 ring-white/10 shadow-lg">
                <div className="flex h-16 shrink-0 items-center">
                  <Image
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                    height={32}
                    width={32}
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={
                                (item.current
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:bg-gray-800 hover:text-white") +
                                " group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              }
                            >
                              <item.icon
                                aria-hidden="true"
                                className="size-6 shrink-0"
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-96 lg:flex-col bg-#000000; backdrop-blur-sm  shadow-lg">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-#000000 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
                height={32}
                width={32}
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={
                            (item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white") +
                            " group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          }
                        >
                          <item.icon
                            aria-hidden="true"
                            className="size-6 shrink-0"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-black px-4 py-4 shadow-xs sm:px-6 xl:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-white"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-white">
            Dashboard
          </div>
        </div>

        <main>
          <GlobeClientWrapper />
          <aside className="backdrop-blur-sm bg-white/10 xl:fixed xl:top-0 xl:right-0 xl:bottom-0 xl:w-96 overflow-y-auto lg:border-l lg:border-white/5 shadow-lg">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-base/7 font-semibold text-white">
                Attacks by Country
              </h2>
              <Link
                href="#"
                className="text-sm/6 font-semibold text-indigo-400"
              >
                View all
              </Link>
            </header>
            <Stats />
          </aside>
        </main>
      </div>
    </>
  );
}

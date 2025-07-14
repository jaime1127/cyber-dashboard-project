"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  XMarkIcon,
  ChartBarSquareIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

import GlobeClientWrapper from "../Globe/GlobeWrapper";
import Attack_By_Login from "../Attack_By_Login/AttackByLogin";
import Link from "next/link";
import Image from "next/image";

const navigation = [
  { name: "General", href: "/general", icon: SignalIcon },
  { name: "Attacks By Country", href: "/attacks-by-country", icon: FolderIcon },
  { name: "Failed User Logins", href: "/failed-logins", icon: ServerIcon },
  { name: "Users MFA", href: "/users-mfa", icon: GlobeAltIcon },
  { name: "Email", href: "/email", icon: ChartBarSquareIcon },
  { name: "Malware", href: "/malware", icon: ChartBarSquareIcon },
];

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <main>
        {/* Mobile sidebar */}
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 transition-opacity duration-300 ease-linear data-closed:opacity-0 backdrop-blur-sm bg-white/10"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 ring-1 ring-white/10 shadow-lg">
                <div className="flex h-16 shrink-0 items-center justify-between w-full">
                  <Link href={"/"}>
                    <Image
                      alt="Your Company"
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                      className="h-8 w-auto"
                      height={32}
                      width={32}
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="p-2"
                  >
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
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
                                (pathname === item.href
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
        <div className="hidden lg:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-96 xl:bottom-60 lg:flex-col backdrop-blur-sm bg-white/10 shadow-lg lg:border-white/5">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r px-6 ">
            <div className="flex h-16 shrink-0 items-center">
              <Link href={"/"}>
                <Image
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                  height={32}
                  width={32}
                />
              </Link>
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
                            (pathname === item.href
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
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-black px-4 py-4 shadow-xs sm:px-6 xl:hidden ring-1 ring-white/10">
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
        <GlobeClientWrapper />

        {/* Right aside */}
        <aside className="xl:fixed xl:top-0 xl:right-0 xl:bottom-60 xl:w-96 overflow-y-auto lg:border-l lg:border-white/5 shadow-lg backdrop-blur-sm bg-white/10">
          <Attack_By_Login />
        </aside>

        {/* Bottom aside */}
        <aside className=" xl:fixed xl:left-0 xl:right-0 xl:bottom-0 xl:h-60 lg:border-t lg:border-white/5  flex flex-col items-center shadow-lg backdrop-blur-sm bg-white/10">
          {children}
        </aside>
      </main>
    </>
  );
}

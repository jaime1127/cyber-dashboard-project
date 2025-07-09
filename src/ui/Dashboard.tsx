"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3Icon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import GlobeClientWrapper from "./Globe/GlobeWrapper";

const navigation = [
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Deployments", href: "#", icon: ServerIcon, current: true },
  { name: "Activity", href: "#", icon: SignalIcon, current: false },
  { name: "Domains", href: "#", icon: GlobeAltIcon, current: false },
  { name: "Usage", href: "#", icon: ChartBarSquareIcon, current: false },
  { name: "Settings", href: "#", icon: Cog6ToothIcon, current: false },
];

const activityItems = [
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    projectName: "ios-app",
    commit: "2d89f0c8",
    branch: "main",
    date: "1h",
    dateTime: "2023-01-23T11:00",
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 xl:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-#000000; transition-opacity duration-300 ease-linear data-closed:opacity-0"
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
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-#000000; px-6 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className="size-6 shrink-0"
                              />
                              {item.name}
                            </a>
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
        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col bg-#000000;">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:bg-gray-800 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className="size-6 shrink-0"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-black px-4 shadow-xs sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-white xl:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-5" />
            </button>

      
          </div>

          <main className="lg:pr-96">
            
            <GlobeClientWrapper />
            {/* Activity feed */}
            <aside className="backdrop-blur-sm bg-white/10 lg:fixed lg:top-16 lg:right-0 lg:bottom-0 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5 shadow-lg">
              <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                <h2 className="text-base/7 font-semibold text-white">
                  Activity feed
                </h2>
                <a href="#" className="text-sm/6 font-semibold text-indigo-400">
                  View all
                </a>
              </header>
              <ul role="list" className="divide-y divide-white/5">
                {activityItems.map((item) => (
                  <li key={item.commit} className="px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-x-3">
                      <img
                        alt=""
                        src={item.user.imageUrl}
                        className="size-6 flex-none rounded-full bg-gray-800"
                      />
                      <h3 className="flex-auto truncate text-sm/6 font-semibold text-white">
                        {item.user.name}
                      </h3>
                      <time
                        dateTime={item.dateTime}
                        className="flex-none text-xs text-gray-600"
                      >
                        {item.date}
                      </time>
                    </div>
                    <p className="mt-3 truncate text-sm text-gray-500">
                      Pushed to{" "}
                      <span className="text-gray-400">{item.projectName}</span>{" "}
                      (
                      <span className="font-mono text-gray-400">
                        {item.commit}
                      </span>{" "}
                      on <span className="text-gray-400">{item.branch}</span>)
                    </p>
                  </li>
                ))}
              </ul>
            </aside>
          </main>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderClient({
  navigation,
}: {
  navigation: NavigationItem[];
}) {
  return (
    <Disclosure
      as="nav"
      className="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <Bars3Icon suppressHydrationWarning className="block size-6 group-data-open:hidden" />
              <XMarkIcon suppressHydrationWarning className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo + Desktop menu */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/">
                <img
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-950/50 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:ml-6 sm:pr-0">
            <button className="rounded-full p-1 text-gray-400 hover:text-white">
              <BellIcon suppressHydrationWarning className="size-6" />
            </button>

            <Menu as="div" className="relative ml-3">
              <MenuButton className="flex rounded-full">
                <img
                  className="size-8 rounded-full bg-gray-800 outline outline-white/10"
                  src="https://avatars.githubusercontent.com/u/1?v=4"
                  alt=""
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline outline-white/10">
                <MenuItem>
                  {({ focus }) => (
                    <Link
                      href="/profile"
                      className={classNames(
                        focus && "bg-white/5",
                        "block px-4 py-2 text-sm text-gray-300",
                      )}
                    >
                      Profile
                    </Link>
                  )}
                </MenuItem>

                <MenuItem>
                  {({ focus }) => (
                    <Link
                      href="/settings"
                      className={classNames(
                        focus && "bg-white/5",
                        "block px-4 py-2 text-sm text-gray-300",
                      )}
                    >
                      Settings
                    </Link>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-950/50 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium",
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
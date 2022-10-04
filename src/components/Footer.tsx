import Link from "next/link";
import Logo from "./Logo";

import { ArrowUp } from "phosphor-react";

export default function Footer() {
  return (
    <footer className="flex justify-around items-baseline w-full p-8">
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <Link href="#">
        <a>
          <ArrowUp
            size={32}
            weight="bold"
            className="ml-4 p-1
            bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-500 text-zinc-900 hover:text-zinc-800  dark:text-zinc-50
            border-2 hover:border-zinc-200 dark:border-none
            hover:p-[2px] hover:shadow-lg shadow-md rounded-md hover:shadow-zinc-300 hover:bg-zinc-50 dark:hover:shadow-zinc-700
            animate-bounce transition-all duration-500"
          />
        </a>
      </Link>
    </footer>
  );
}

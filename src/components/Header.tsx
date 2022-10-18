import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoonStars, Sun, User } from "phosphor-react";
import { AuthContext } from "../context/AuthContext";

const hour = new Date().getHours();

export default function Header() {
  const { userLogged, signOutUser } = useContext<any>(AuthContext);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState("Alexandre");
  const [toggleMenuUser, setToggleMenuUser] = useState(false);

  useEffect(() => {
    function checkHour() {
      if (theme === "system") {
        if (hour >= 18 && hour <= 6) {
          localStorage.setItem("theme", "dark");
          return setTheme("dark");
        } else {
          localStorage.setItem("theme", "light");
          return setTheme("light");
        }
      }
    }
    checkHour();

    setMounted(true);
  }, [setTheme, theme]);
  if (!mounted) return null;

  function isDark() {
    if (theme) return theme === "dark";
  }

  const isBrowser = typeof window !== "undefined";

  const isMinWidth = () => {
    if (isBrowser) return window.matchMedia("(min-width: 640px)").matches;
    return false;
  };

  function disconnected() {
    setUser("");
    signOutUser();
    console.log("Desconectado");
  }

  return (
    <header
      className={`card-glass fixed top-0 w-screen flex justify-between sm:justify-center items-center p-4 shadow-md border-b-2
    bg-white dark:bg-black border-zinc-100 dark:border-zinc-800 z-10`}
    >
      <Link href="/">
        <a>
          {isMinWidth() ? (
            <Image
              src="/logo.svg"
              alt="Academic Plus"
              width="566"
              height="32"
            />
          ) : (
            <Image
              src="/logoP.svg"
              alt="Academic Plus"
              width="40"
              height="40"
            />
          )}
        </a>
      </Link>

      <div className="relative sm:absolute right-0 sm:right-8 flex items-center md:gap-8 sm:gap-4 gap-2 sm:pl-0 pl-2 text-primary-500 dark:text-primary-200">
        <button
          onClick={() => setTheme(isDark() ? "light" : "dark")}
          className="p-1 bg-white/80 dark:bg-zinc-700 shadow rounded-full hover:scale-110 hover:shadow-md
          focus:scale-110 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={24} /> : <MoonStars size={24} />}
        </button>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setToggleMenuUser(!toggleMenuUser)}
              className="p-1 bg-white/80 dark:bg-zinc-700 shadow rounded-full hover:scale-110 hover:shadow-md
              focus:scale-110 transition-colors"
            >
              <div className="hover:scale-110 transition-all">
                <User size={28} />
              </div>
            </button>
            {toggleMenuUser ? (
              <ul className="absolute top-12 right-0 flex flex-col gap-4 items-center rounded p-4 bg-white/95 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 scale-100">
                <li className="hover:border-b border-primary-500 dark:border-primary-200 hover:-mb-px">
                  <Link href="/profile">
                    <a>Perfil</a>
                  </Link>
                </li>
                <li className="hover:border-b border-primary-500 dark:border-primary-200 hover:-mb-px">
                  <Link href="/settings">
                    <a>Configurações</a>
                  </Link>
                </li>
                <li className="hover:border-b border-primary-500 dark:border-primary-200 hover:-mb-px">
                  <Link href="/">
                    <button onClick={() => disconnected()}>Sair</button>
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        ) : (
          <Link href="/login">
            <a>Entrar</a>
          </Link>
        )}
      </div>
    </header>
  );
}

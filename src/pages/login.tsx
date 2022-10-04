import Head from "next/head";
import Header from "../components/Header";
import { useState } from "react";
import Link from "next/link";
import { LockSimple, User } from "phosphor-react";

import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    return console.log("Enviado");
  }

  return (
    <>
      <Head>
        <title>Entre no A+ 📘</title>
      </Head>
      <div className="min-w-screen min-h-screen flex flex-col">
        <Header />
        <main
          className="flex-1 md:px-40 flex flex-col
          justify-center items-center         
          bg-gradient-to-r
          dark:bg-gradient-to-t from-blue-500  to-cyan-500
          dark:from-primary-900 dark:to-black
          relative"
        >
          <form
            onSubmit={handleSubmit}
            autoComplete="on"
            id="form"
            className="flex-1 flex flex-col gap-6 h-fit sm:p-12 py-32 px-8 w-full 
            bg-white
            dark:bg-black
            text-primary-500 
            dark:text-primary-200
            sm:w-[420px]
            sm:flex-none
            sm:my-10  
            sm:border-b-8 sm:border-r-4 sm:rounded-2xl sm:shadow-2xl
            sm:dark:border-zinc-800"
          >
            <h1 className="text-5xl font-semibold text-center">Login</h1>

            <Input
              key="email"
              type="email"
              label="Email"
              Icon={<User weight="bold" />}
              value={email}
              setValue={setEmail}
            />

            <Input
              key="password"
              type="password"
              label="Senha"
              Icon={<LockSimple weight="bold" />}
              value={password}
              setValue={setPassword}
            />

            <small className="-mt-4 mb-4 text-left text-sm font-medium">
              Esqueceu a senha?
              <Link href="/">
                <a
                  className="hover:text-primary-600
                  dark:hover:text-primary-100 focus:outline-none
                focus:text-primary-600
                dark:focus:text-primary-100
                focus:border-b-2
                focus:border-b-primary-600
                dark:focus:border-primary-200
                transition  "
                >
                  {" "}
                  Clique aqui
                </a>
              </Link>
            </small>

            <Button text="Entrar" type="submit" />
          </form>
        </main>
      </div>
    </>
  );
}

import { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
import { LockSimple, User } from "phosphor-react";

import { AuthContext, InitialValues } from "../../context/AuthContext";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";

export default function Root() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext<InitialValues>(AuthContext);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (username && password) {
      try {
        signIn({ username, password });
      } catch (error: any) {
        toast.error(error, {
          autoClose: 3000
        });
      }
    }
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
            <h1 className="text-5xl font-semibold text-center">Admin</h1>

            <Input
              key="username"
              type="text"
              label="Usuário"
              Icon={<User weight="bold" />}
              value={username}
              setValue={setUsername}
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

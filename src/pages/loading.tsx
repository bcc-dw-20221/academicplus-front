import Head from "next/head";
import Image from "next/image";
import { CircleNotch as Load } from "phosphor-react";

export default function Loading() {
  return (
    <>
      <Head>
        <title>Carregando...</title>
      </Head>
      <main className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="animate-pulse sm:10 p-6">
          <Image
            src={"/logo.svg"}
            alt="Academic Plus"
            width="548"
            height="64"
          />
        </div>
        {true ? (
          <Load size={40} className="animate-spin text-zinc-400" />
        ) : (
          <div className="flex items-center gap-2 text-zinc-200">
            <span className="text-xl">Carregando</span>
            <Load size={20} className="animate-spin" />
          </div>
        )}
        <small className="absolute bottom-4 text-zinc-600 dark:text-zinc-400">
          Aguarde um momento, estamos consultando os dados.
        </small>
      </main>
    </>
  );
}

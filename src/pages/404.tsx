import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>.: 404 :.</title>
      </Head>
      <main className="w-screen h-screen flex flex-col items-center justify-center gap-12">
        <div className="w-[300px]">
          <Image
            src="/erro-404.svg"
            alt="erro 404"
            width="860.13137"
            height="571.14799"
          />
        </div>

        <span className="text-3xl font-bold">
          Ops... Página não encontrada.
        </span>
        <Link href="/">
          <a className="link text-xl font-medium underline">Home</a>
        </Link>
      </main>
    </>
  );
}

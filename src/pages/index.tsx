import Head from "next/head";
import Header from "../components/Header";

export default function PageIndex() {
  return (
    <>
      <Head>
        <title>Academic Plus</title>
      </Head>
      <Header />
      <main>
        <h1>Academic Plus</h1>
      </main>
    </>
  );
}

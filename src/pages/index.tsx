import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";

export default function PageIndex() {
  return (
    <>
      <Head>
        <title>Academic Plus</title>
      </Head>
      <Header />
      <Main title="Home">
        <div>home</div>
      </Main>
    </>
  );
}

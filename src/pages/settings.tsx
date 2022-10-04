import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Configurações</title>
      </Head>
      <Header />
      <Main title="Configurações da conta">{}</Main>
      <Footer />
    </>
  );
}

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CardItem from "../components/CardItem";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import { options } from "../db/itensAluno";
import { PATHS } from "../utils/constants";

const Home: NextPage = () => {
  const router = useRouter();
  const name = "Alexandre";

  useEffect(() => {
    router.push(PATHS.HOME);
  }, []);

  return (
    <>
      <Head>
        <title>Academic Plus</title>
      </Head>
      <Header />
      <Main title={`Bem vindo de volta, ${name}!`}>
        <section>
          <ul className="flex sm:gap-10 gap-6 flex-wrap justify-center p-1">
            {options.map(e => (
              <CardItem
                key={e.title}
                title={e.title}
                img={e.img}
                rote={e.rote}
                alt={e.rote}
              />
            ))}
          </ul>
        </section>
      </Main>
      <Footer />
    </>
  );
};

export default Home;

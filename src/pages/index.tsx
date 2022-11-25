import React, { useContext } from "react";
import Head from "next/head";
import { parseCookies } from "nookies";

import { cardsList } from "../utils/itemsHome";
import { AuthContext } from "../context/AuthContext";

import Main from "../components/Main";
import CardItem from "../components/CardItem";
import Footer from "../components/Footer";

export default function Home() {
  const { user } = useContext<any>(AuthContext);

  console.log(user.permission[0]);

  return (
    <>
      <Head>
        <title>Academic Plus</title>
      </Head>
      <Main title={`Bem vindo de volta, ${user?.name}!`}>
        <section>
          <ul className="flex sm:gap-10 gap-6 flex-wrap justify-center p-1">
            {
              // options.map(e => (
              user.permission[0] === "ROLE_STUDENT"
                ? cardsList.student.map(e => (
                    <CardItem
                      key={e.title}
                      title={e.title}
                      img={e.img}
                      rote={e.rote}
                      alt={e.rote}
                    />
                  ))
                : user.permission[0] === "ROLE_PROFESSOR"
                ? cardsList.teacher.map(e => (
                    <CardItem
                      key={e.title}
                      title={e.title}
                      img={e.img}
                      rote={e.rote}
                      alt={e.rote}
                    />
                  ))
                : user.permission[0] === "ROLE_ADMIN"
                ? cardsList.education_manager.map(e => (
                    <CardItem
                      key={e.title}
                      title={e.title}
                      img={e.img}
                      rote={e.rote}
                      alt={e.rote}
                    />
                  ))
                : user.permission[0] === "ROLE_ROOT"
                ? cardsList.coordinator.map(e => (
                    <CardItem
                      key={e.title}
                      title={e.title}
                      img={e.img}
                      rote={e.rote}
                      alt={e.rote}
                    />
                  ))
                : ""
            }
          </ul>
        </section>
      </Main>
      <Footer />
    </>
  );
}

//método executado no lado do servidor, quando o user acessar a página;
//nesse caso o next faz um get na minha api antes de rendezirar a pagina, ou seja
//antes de aparecer qualquer tipo de interface
export async function getServerSideProps(context: any) {
  const cookies = parseCookies(context);

  const token = cookies["nextauth.token"];

  // console.log(token);
  //se não existir o token, ele redireciona para a pag index.
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }
  return {
    props: {}
  };
  // const dataPreRecords = await instanceapi.get("/pre-register");
  // const dataCourses = await instanceapi.get("/courses");
}

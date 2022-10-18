import React, { useContext } from "react";
import { Button, Container, Flex, List, ListItem, Box } from "@chakra-ui/react";
import Router from "next/router";
import { PATHS } from "../../utils/constants";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CardItem from "../../components/CardItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Main from "../../components/Main";
import { options } from "../../utils/itemsHome";
import { AuthContext } from "../../context/AuthContext";
import { parseCookies } from "nookies";

export default function Home() {
  const { userLogged } = useContext<any>(AuthContext);

  const items = [
    { id: 1, title: "University", path: PATHS.UNIVERSITY },
    { id: 2, title: "Pre-Registro", path: PATHS.PRE_REGISTER },
    { id: 3, title: "Professor", path: PATHS.PROFESSOR },
    { id: 4, title: "Cursos", path: PATHS.COURSES },
    { id: 5, title: "Aluno", path: PATHS.STUDENT }
  ];

  return (
    <Box>
      <Head>
        <title>Academic Plus</title>
      </Head>
      {/*<Flex>
         <List mt="5rem">
          {items.map((item: any) => {
            return (
              <ListItem key={item.id}>
                <Button
                  fontSize="1.8rem"
                  _hover={{ bg: "#4299E1" }}
                  backgroundColor="#63B3ED"
                  gap="0.7rem"
                  color="white"
                  fontWeight="bold"
                  ml="0.5rem"
                  width="31rem"
                  borderRadius="3px 5px 5px 5px"
                  onClick={() => Router.push(item.path)}
                >
                  {item.title}
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Flex> */}

      <Main title={`Bem vindo de volta, ${userLogged?.name}!`}>
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
    </Box>
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
  // const dataPreRecords = await instanceAxios.get("/pre-register");
  // const dataCourses = await instanceAxios.get("/courses");
}

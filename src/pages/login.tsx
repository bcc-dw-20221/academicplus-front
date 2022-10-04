import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";

export default function Login() {
  return (
    <>
      <Head>
        <title>Faça seu Login</title>
      </Head>
      <Header />
      <Main title="Login">
        <div>login</div>
      </Main>
    </>
  );
}

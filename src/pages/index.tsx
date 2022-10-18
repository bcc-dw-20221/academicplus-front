import type { NextPage } from "next";
import Head from "next/head";

import { useRouter } from "next/router";
import { useEffect } from "react";

import { PATHS } from "../utils/constants";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(PATHS.HOME);
  }, [router]);

  return (
    <>
      <Head>
        <title>Academic Plus</title>
      </Head>
    </>
  );
};

export default Home;

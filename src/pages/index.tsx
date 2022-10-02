import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PATHS } from "../utils/constants";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(PATHS.HOME);
  }, []);

  return <></>;
};

export default Home;

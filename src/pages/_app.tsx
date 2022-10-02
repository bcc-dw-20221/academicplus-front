import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/provider";
import Header from "../components/Header";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { PATHS } from "../utils/constants";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        {router.pathname === PATHS.LOGIN ? "" : <Header />}

        <ToastContainer />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default MyApp;

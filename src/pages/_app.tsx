import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/provider";
import { ThemeProvider as UiThemeProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import Header from "../components/Header";
import { theme } from "../styles/theme";
import { PATHS } from "../utils/constants";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      <ThemeProvider>
        <UiThemeProvider theme={theme}>
          <ChakraProvider>
            {router.pathname === PATHS.LOGIN ? "" : <Header />}

            <ToastContainer />
            <Component {...pageProps} />
          </ChakraProvider>
        </UiThemeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;

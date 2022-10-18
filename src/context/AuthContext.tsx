import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import { useRouter } from "next/router";
import { toast } from "react-toastify";
import parseJwt from "../utils/parseJwt";
import axios from "axios";
import { instanceAxios } from "../services/axiosService";
import { singOut } from "../utils/singOut";
const AuthContext = createContext({});

interface SignInProps {
  email: string;
  password: string;
}

function AuthProvider({ children }: any) {
  const [userLogged, setUserLogged] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!userLogged;
  const router = useRouter();
  const urlApiLogin = "https://share-blog-api.herokuapp.com/";

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      setIsLoading(true);
      setUserLogged(parseJwt(token));
    }
  }, []);

  const signOutUser = () => {
    setIsLoading(false);
    setUserLogged(undefined);
    singOut();
  };

  async function singIn({ email, password }: SignInProps) {
    try {
      const res = await axios.post(urlApiLogin + "token", {
        email,
        password
      });

      const { token } = res.data;

      setCookie(undefined, "nextauth.token", token, {
        //tempo de vida do cookie
        maxAge: 60 * 60 * 24 * 30, //30 dias
        //quais caminhos da aplicação vão ter acessos a esses cookies
        //no caso,esse vai ter usado de forma global
        path: "/"
      });

      setUserLogged(parseJwt(token));

      //atulizando o header
      instanceAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      router.push("/");
    } catch (err) {
      // toast.error(err.response.data.message, {
      //   autoClose: 2000
      // });
    }
  }

  return (
    <AuthContext.Provider
      value={{ singIn, userLogged, isLoading, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

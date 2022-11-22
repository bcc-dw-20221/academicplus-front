import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import { useRouter } from "next/router";
import { toast } from "react-toastify";
import parseJwt from "../utils/parseJwt";
import axios from "axios";
import { instanceAxios } from "../services/axiosService";
import { singOut } from "../utils/singOut";

interface SignInProps {
  email: string;
  password: string;
}

const AuthContext = createContext({});

function AuthProvider({ children }: any) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const urlApiLogin = "https://share-blog-api.herokuapp.com/";

  console.log(user);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      const userCache = parseJwt(token);
      setIsLoading(true);
      setUser(userCache);
      setUser((prevState: any) => ({ ...prevState, name: "Alexandre" }));
    }
  }, []);

  const signOut = () => {
    setIsLoading(false);
    setUser(undefined);
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

      setUser(parseJwt(token));

      //atulizando o header
      instanceAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      router.push("/");
    } catch (err: any) {
      toast.error(err.response.data.error, {
        autoClose: 2000
      });
    }
  }

  return (
    <AuthContext.Provider value={{ singIn, user, setUser, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

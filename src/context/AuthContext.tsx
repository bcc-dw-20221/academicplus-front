import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { setCookie, parseCookies, destroyCookie } from "nookies";

import { toast } from "react-toastify";
import parseJwt from "../utils/parseJwt";
import { api } from "../services/axios";
import { singOut } from "../utils/singOut";
import { env } from "process";

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

  console.log(process.env.API_BASEURL);

  console.log(user);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      const userCookies = parseJwt(token);

      try {
      } catch (error) {}

      setIsLoading(true);
      setUser(userCookies);

      return setUser((prevState: any) => ({ ...prevState, name: "Alexandre" }));
    }
  }, []);

  const signOut = () => {
    setIsLoading(false);
    setUser(undefined);
    singOut();
  };

  async function singIn({ email, password }: SignInProps) {
    try {
      const res = await api.post("http://localhost:8080/", {
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

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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

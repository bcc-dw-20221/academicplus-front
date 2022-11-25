import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { setCookie, parseCookies, destroyCookie } from "nookies";

import { UserModel } from "../model/UserModel";
import { toast } from "react-toastify";
import parseJwt from "../utils/parseJwt";
import { api } from "../services/axios";
interface SignInProps {
  username: string;
  password: string;
}

export interface InitialValues {
  user: UserModel;
  setUser: (user: UserModel) => void;
  signIn: ({ username, password }: SignInProps) => void;
  authenticated: boolean;
  setAuthenticated: (boolean: boolean) => void;
  isLoading: boolean;
  setIsLoading: (boolean: boolean) => void;
  signOut: () => void;
}

const initialValue = {
  user: {
    id: "",
    name: "",
    username: "",
    email: "",
    permission: ""
  },
  setUser: (newState: UserModel) => {},
  signIn: ({ username, password }: SignInProps) => {},
  authenticated: false,
  setAuthenticated: (boolean: boolean) => {},
  isLoading: false,
  setIsLoading: (boolean: boolean) => {},
  signOut: () => {}
};

export const AuthContext = createContext<InitialValues>(initialValue);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserModel>({
    id: "",
    name: "",
    username: "",
    email: "",
    permission: ""
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  // console.log(process.env.API_BASEURL);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      const userCookies = parseJwt(token);

      console.log(userCookies);
      setAuthenticated(true);

      setUser({
        id: "",
        name: userCookies.sub,
        username: userCookies.sub,
        email: "",
        permission: userCookies.roles
      });
    }
  }, []);

  function signOut() {
    setAuthenticated(false);
    destroyCookie(undefined, "nextauth.token");
    setUser({
      id: "",
      name: "",
      username: "",
      email: "",
      permission: ""
    });

    return;
  }

  async function signIn({ username, password }: SignInProps) {
    try {
      const res = await api.post("/login", {
        username,
        password
      });
      console.log("Enviado");

      setAuthenticated(res.status === 200);

      if (!authenticated) return;

      const { accessToken: token } = res.data;

      setCookie(undefined, "nextauth.token", token, {
        //tempo de vida do cookie
        maxAge: 60 * 10, // 10 minutes
        //quais caminhos da aplicação vão ter acessos a esses cookies
        //no caso,esse vai ter usado de forma global
        path: "/"
      });

      const userCookies = parseJwt(token);
      console.log({ userCookies, token });

      setUser({
        id: "",
        name: "",
        username: userCookies.sub,
        email: "",
        permission: userCookies.roles
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      router.push("/");
    } catch (err: any) {
      // console.log(err.response.data);
      toast.error("Erro Interno. Tente novamente mais tarde.", {
        autoClose: 3000
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        setUser,
        authenticated,
        setAuthenticated,
        isLoading,
        setIsLoading,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

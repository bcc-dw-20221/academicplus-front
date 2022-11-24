import { createContext, ReactNode, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import { setCookie, parseCookies, destroyCookie } from "nookies";

import { UserModel } from "../model/UserModel";
import { toast } from "react-toastify";
import parseJwt from "../utils/parseJwt";
import { api } from "../services/axios";

interface AuthProviderProps {
  children: ReactNode;
}
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
  console.log(process.env.API_BASEURL);
  console.log(user);

  destroyCookie({}, "token");
  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    console.log({ token });

    if (token) {
      const userCookies = parseJwt(token);

      console.log({ userCookies });

      setAuthenticated(true);
      setUser(userCookies);

      return setUser((prevState: any) => ({ ...prevState, name: "Alexandre" }));
    }
  }, []);

  const signOut = () => {
    destroyCookie(undefined, "nextauth.token");
    setUser({
      id: "",
      name: "",
      username: "",
      email: "",
      permission: ""
    });

    setAuthenticated(false);
    return Router.push("/login");
  };

  async function signIn({ username, password }: SignInProps) {
    try {
      console.log("Enviado");
      const res = await api.post("/login", {
        username,
        password
      });

      console.log("Enviado");
      console.log(res.status);
      console.log(res.data);

      setAuthenticated(res.status === 200);
      console.log({ res });

      const { token } = res.data;

      setCookie(undefined, "nextauth.token", token, {
        //tempo de vida do cookie
        maxAge: 60 * 60 * 24 * 30, //30 dias
        //quais caminhos da aplicação vão ter acessos a esses cookies
        //no caso,esse vai ter usado de forma global
        path: "/"
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser((prevState: any) => ({ ...prevState, name: "Alexandre" }));

      router.push("/");
    } catch (err: any) {
      console.log(err);
      // toast.error(err.response.data.error, {
      //   autoClose: 2000
      // });
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

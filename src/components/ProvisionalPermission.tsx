import { IdentificationBadge } from "phosphor-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { PATHS } from "../utils/constants";

const items = [
  { id: 1, title: "University", path: PATHS.UNIVERSITY },
  { id: 2, title: "Pre-Registro", path: PATHS.PRE_REGISTER },
  { id: 3, title: "Professor", path: PATHS.PROFESSOR },
  { id: 4, title: "Cursos", path: PATHS.COURSES },
  { id: 5, title: "Aluno", path: PATHS.STUDENT }
];

export function ProvisionalPermission() {
  const { user, setUser } = useContext<any>(AuthContext);

  function handleTogglePermission(str: any) {
    setUser((prevState: any) => ({ ...prevState, permission: [str] }));
  }

  const [toggleMenuPermission, setToggleMenuPermission] = useState(false);
  return (
    <>
      {user ? (
        <div className="absolute top-3 left-2">
          <div className="relative">
            <button
              onClick={() => setToggleMenuPermission(!toggleMenuPermission)}
              className="bg-primary-500 text-zinc-50 p-2 rounded-full"
            >
              <IdentificationBadge size={32} />
            </button>
            {toggleMenuPermission ? (
              <ul
                onMouseLeave={() => setToggleMenuPermission(false)}
                className="absolute top-0 left-14 p-2 bg-primary-500 text-zinc-50 font-medium rounded shadow-md border-2 border-primary-400/50 whitespace-nowrap"
              >
                <li>
                  <button
                    onClick={() => handleTogglePermission("ROLE_STUDENT")}
                  >
                    Aluno
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleTogglePermission("ROLE_PROFESSOR")}
                  >
                    Professor
                  </button>
                </li>

                <li>
                  <button onClick={() => handleTogglePermission("ROLE_ADMIN")}>
                    Gestor de Ensino
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTogglePermission("ROLE_ROOT")}>
                    Root
                  </button>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

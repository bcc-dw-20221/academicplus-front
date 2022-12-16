import { UserCircle } from "phosphor-react";
import Main from "../../components/Main";

export default function Profile() {
  return (
    <Main title="Perfil">
      <div>
        <UserCircle size={240} weight={"light"} />
      </div>
    </Main>
  );
}

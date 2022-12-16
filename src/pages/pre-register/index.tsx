import Router from "next/router";

import { PATHS } from "../../utils/constants";
import { IconButton, TableCell, Tooltip, TableRow } from "@mui/material";
import Table from "../../components/table/Table";

import { Button as Btn, Container, Flex, Icon } from "@chakra-ui/react";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { cellValue } from "../../utils/utilsForTable";
import { parseCookies } from "nookies";
import Button from "../../components/Button";
import Main from "../../components/Main";
import Link from "next/link";

export default function University(prop: any) {
  return (
    <Main title="Pré-registro">
      <div className="w-full flex justify-between gap-4 mb-2">
        <Link href={PATHS.HOME}>
          <a className="link">Home</a>
        </Link>

        <Link href={PATHS.FORM_PRE_REGISTER}>
          <a>
            <Button text="Cadastrar uma pessoa" />
          </a>
        </Link>
      </div>
      <Table
        header={[
          // ["ID", "left", null, ""],
          ["Nome", "left", null, ""],
          ["Rua", "left", null, ""],
          ["Numero", "left", null, ""],
          ["CEP", "left", null, ""]
        ]}
        size={prop.users.length}

        // rowsPerPage={rowsPerPage}
        // page={page}
        // handleChangePage={handleChangePage}
        // handleChangeRowsPerPage={handleChangeRowsPerPage}
        // isLoading={isLoading}
      >
        {prop.users.map((users: any) => {
          return (
            <TableRow key={users?.id?.value}>
              <TableCell>{cellValue(users.name)}</TableCell>
              <TableCell>{cellValue(users?.address?.street)}</TableCell>
              <TableCell>{cellValue(users?.address?.number)}</TableCell>
              <TableCell>{cellValue(users?.address?.zipCode)}</TableCell>

              <TableCell align="center">
                <Tooltip title="Editar">
                  <IconButton>
                    <Icon as={RiPencilLine} width="18" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton>
                    <Icon as={RiDeleteBinLine} width="18" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </Main>
  );
}

//método executado no lado do servidor, quando o user acessar a página;
//nesse caso o next faz um get na minha api antes de rendezirar a pagina, ou seja
//antes de aparecer qualquer tipo de interface
export async function getServerSideProps(context: any) {
  const cookies = parseCookies(context);

  const token = cookies["nextauth.token"];
  var axios = require("axios").default;

  var options = {
    method: "GET",
    url: "http://localhost:8080/pre-register",
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.request(options);
  return {
    props: {
      users: response.data
    } // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}

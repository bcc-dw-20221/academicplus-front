import Router from "next/router";
import { toast } from "react-toastify";
import { PATHS, TEXTS } from "../../utils/constants";
import {
  Button as ButtonMui,
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  TableCell,
  Tooltip,
  TableRow
} from "@mui/material";
import Table from "../../components/table/Table";
// import FeatherIcon from "feather-icons-react";

import { getAllUniversities } from "../../services/universityService";
import { Button, Container, Flex, Icon } from "@chakra-ui/react";
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { cellValue } from "../../utils/utilsForTable";
import { instanceAxios } from "../../services/axiosService";
export default function University(prop: any) {
  return (
    <Container gap="1rem">
      <Flex>
        <Button
          fontSize="1.8rem"
          _hover={{ bg: "#4299E1" }}
          backgroundColor="#63B3ED"
          gap="0.7rem"
          color="white"
          fontWeight="bold"
          mt="1rem"
          ml="0.5rem"
          width="31rem"
          borderRadius="3px 5px 5px 5px"
          onClick={() => Router.push(PATHS.HOME)}
        >
          Home
        </Button>
      </Flex>

      <Button
        fontSize="1.8rem"
        _hover={{ bg: "#4299E1" }}
        backgroundColor="#63B3ED"
        gap="0.7rem"
        color="white"
        fontWeight="bold"
        mt="1rem"
        ml="0.5rem"
        width="31rem"
        borderRadius="3px 5px 5px 5px"
        onClick={() => Router.push(PATHS.FORM_PRE_REGISTER)}
      >
        Cadastrar uma Pessoa
      </Button>
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
    </Container>
  );
}

//método executado no lado do servidor, quando o user acessar a página;
//nesse caso o next faz um get na minha api antes de rendezirar a pagina, ou seja
//antes de aparecer qualquer tipo de interface
export async function getServerSideProps() {
  const response = await instanceAxios.get("/pre-register");
  console.log(response.data);
  return {
    props: {
      users: response.data
    } // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}

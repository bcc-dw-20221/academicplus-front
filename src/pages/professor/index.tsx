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
import { api } from "../../services/axios";
import { parseCookies } from "nookies";
export default function University(prop: any) {
  return (
    <Container style={{marginTop: "7rem"}} gap="1rem">
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
        onClick={() => Router.push(PATHS.FORM_PROFESSOR)}
      >
        Cadastrar um Professor
      </Button>
      <Table
        header={[
          // ["ID", "left", null, ""],
          ["Nome", "left", null, ""],
          ["Rua", "left", null, ""],
          ["Numero", "left", null, ""],
          ["CEP", "left", null, ""]
        ]}
        size={prop.professors.length}

        // rowsPerPage={rowsPerPage}
        // page={page}
        // handleChangePage={handleChangePage}
        // handleChangeRowsPerPage={handleChangeRowsPerPage}
        // isLoading={isLoading}
      >
        {prop.professors.map((professor: any) => {
          return prop.users.map((user: any) => {
            return professor.personID.value === user.id.value ? (
              <>
                <TableRow key={user?.id?.value}>
                  <TableCell>{cellValue(user.name)}</TableCell>
                  <TableCell>{cellValue(user?.address?.street)}</TableCell>
                  <TableCell>{cellValue(user?.address?.number)}</TableCell>
                  <TableCell>{cellValue(user?.address?.zipCode)}</TableCell>

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
              </>
            ) : null;
          });
        })}
      </Table>
    </Container>
  );
}

//método executado no lado do servidor, quando o user acessar a página;
//nesse caso o next faz um get na minha api antes de rendezirar a pagina, ou seja
//antes de aparecer qualquer tipo de interface
export async function getServerSideProps(context:any) {
  const cookies = parseCookies(context);

  const token = cookies["nextauth.token"];
  var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'http://localhost:8080/professors',
  headers: {
    Authorization: `Bearer ${token}`
  }
};

var optionsUsers = {
  method: 'GET',
  url: 'http://localhost:8080/pre-register',
  headers: {
    Authorization: `Bearer ${token}`
  }
};

const response = await axios.request(options)
const users = await axios.request(optionsUsers)
  
  return {
    props: {
      professors: response.data,
      users: users.data
    } // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}

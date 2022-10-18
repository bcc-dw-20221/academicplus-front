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
        onClick={() => Router.push(PATHS.FORM_COURSES)}
      >
        Cadastrar um Curso
      </Button>
      <Table
        header={[
          // ["ID", "left", null, ""],
          ["Nome", "left", null, ""],
          ["Horas", "left", null, ""],
          ["Nivel", "left", null, ""],
          ["Grau", "left", null, ""]
        ]}
        size={prop?.courses?.length}

        // rowsPerPage={rowsPerPage}
        // page={page}
        // handleChangePage={handleChangePage}
        // handleChangeRowsPerPage={handleChangeRowsPerPage}
        // isLoading={isLoading}
      >
        {prop.courses.map((course: any) => {
          return (
            <TableRow key={course?.id?.value}>
              <TableCell>{cellValue(course.name)}</TableCell>
              <TableCell>{cellValue(course?.hours)}</TableCell>
              <TableCell>{cellValue(course?.level)}</TableCell>
              <TableCell>{cellValue(course?.grau)}</TableCell>

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
  const response = await instanceAxios.get("/courses");
  console.log(response.data);
  return {
    props: {
      courses: response.data
    } // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}

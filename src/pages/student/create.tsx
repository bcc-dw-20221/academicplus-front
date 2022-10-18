import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Stack,
  Switch,
  TextField
} from "@mui/material";
import { Text, Button as ButtonChakra } from "@chakra-ui/react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Router from "next/router";
import { instanceAxios } from "../../services/axiosService";
import { getAllCourses } from "../../services/coursesService";
import { registerStudent } from "../../services/studentService";
import { getAllPreRecords } from "../../services/preRegisterService";

import { toast } from "react-toastify";
import { PATHS, TEXTS } from "../../utils/constants";

export default function CreateStudent(prop: any) {
  const [CPF, setCPF] = useState("");
  const [courseName, setCourseName] = useState("");

  console.log(prop);
  const courseId = prop.courses.filter(
    (item: any) => item?.name === courseName
  );
  const cpfExists = prop.preRecords.filter(
    (item: any) => item?.id?.value === CPF
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (cpfExists) {
        if (CPF && courseId[0].id.value) {
          await registerStudent(CPF, courseId[0].id.value);
          toast.success(TEXTS.REGISTER_SUCESS, {
            autoClose: 2000
          });
        }
      }
    } catch (error) {
      toast.error(TEXTS.ERROR, { autoClose: 2000 });
    }
    Router.push(PATHS.STUDENT);
  };

  return (
    <Container fixed>
      <Text fontSize="2rem">{`${"Cadastro"} de Aluno`}</Text>
      <Grid container spacing={0}>
        <Grid item lg={12} md={12} xs={12}>
          <Card variant="outlined" sx={{ p: 0 }}>
            <CardContent sx={{ padding: "30px" }}>
              <form onSubmit={handleSubmit}>
                {/* <form> */}
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="type">CPF da Pessoa</FormLabel>
                      <TextField
                        size="small"
                        placeholder="Ex: 000.000.000-00"
                        required
                        onChange={e => setCPF(e.target.value)}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="Sexo">Curso</FormLabel>
                      <TextField
                        select
                        size="small"
                        defaultValue="Selecione uma Universidade"
                        // required
                        onChange={e => setCourseName(e.target.value)}
                      >
                        <MenuItem disabled value="Selecione uma Universidade">
                          Selecione um Curso
                        </MenuItem>
                        {prop.courses.map((course: any) => {
                          return (
                            <MenuItem
                              key={course.id.value}
                              value={course?.name}
                            >
                              {course?.name}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </FormControl>
                  </Grid>

                  {/* Botões */}
                  <Grid item sm={12}>
                    <Box display="flex" justifyContent="flex-start">
                      <Stack
                        spacing={1}
                        direction={{ xs: "column", sm: "row" }}
                      >
                        <Button type="submit" variant="contained">
                          Cadastrar
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ ":hover": { bgcolor: "red" } }}
                          onClick={() => Router.push(PATHS.STUDENT)}
                        >
                          Cancelar
                        </Button>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

//método executado no lado do servidor, quando o user acessar a página;
//nesse caso o next faz um get na minha api antes de rendezirar a pagina, ou seja
//antes de aparecer qualquer tipo de interface
export async function getServerSideProps() {
  const dataPreRecords = await instanceAxios.get("/pre-register");
  const dataCourses = await instanceAxios.get("/courses");

  return {
    props: {
      preRecords: dataPreRecords.data,
      courses: dataCourses.data
    } // will be passed to the page component as props
    //sempre tem que passar o componente props, mesmo que seja vazio.
  };
}

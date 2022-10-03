// import { useContext, useEffect } from 'react';
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
import { getAllCourses } from "../../services/coursesService";
import { registerStudent } from "../../services/studentService";
import { getAllPreRecords } from "../../services/preRegisterService";

import { toast } from "react-toastify";
import { PATHS, TEXTS } from "../../utils/constants";
import Router from "next/router";

export default function CreateStudent() {
  const [CPF, setCPF] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [courseName, setCourseName] = useState("");
  const [preRecords, setPreRecords] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllCourses();
        const dataPreRecords = await getAllPreRecords();
        setCourses(data);
        setPreRecords(dataPreRecords);
      } catch (error) {
        toast.error(TEXTS.ERROR, {
          autoClose: 2000
        });
      }
    })();
  }, []);
  console.log(preRecords);
  const courseId = courses.filter(item => item?.name === courseName);
  const cpfExists = preRecords.filter(item => item?.id?.value === CPF);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (cpfExists) {
        if (CPF && courseId[0].id.value) {
          await registerStudent(CPF, courseId[0].id.value);
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
                        {courses.map(course => {
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

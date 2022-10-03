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
import { registerCourse } from "../../services/coursesService";
import { toast } from "react-toastify";
import { PATHS, TEXTS } from "../../utils/constants";
import Router from "next/router";

export default function CreateUniversity() {
  const [name, setName] = useState("");
  const [hours, setHours] = useState(0);
  const [level, setLevel] = useState("TECNICO");
  const [grade, setGrade] = useState("SUPERIOR");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (name && hours && level && grade) {
        await registerCourse(name, hours, level, grade);
        toast.success(TEXTS.REGISTER_SUCESS, {
          autoClose: 2000
        });
        Router.push(PATHS.COURSES);
      } else {
        toast.error(TEXTS.ERROR, {
          autoClose: 2000
        });
      }
    } catch (error) {
      toast.error(TEXTS.ERROR, {
        autoClose: 2000
      });
    }
  };

  return (
    <Container fixed>
      <Text fontSize="2rem">{`${"Cadastro"} de Curso`}</Text>
      <Grid container spacing={0}>
        <Grid item lg={12} md={12} xs={12}>
          <Card variant="outlined" sx={{ p: 0 }}>
            <CardContent sx={{ padding: "30px" }}>
              <form onSubmit={handleSubmit}>
                {/* <form> */}
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="type">Nome</FormLabel>
                      <TextField
                        size="small"
                        placeholder="Nome da Universidade"
                        required
                        onChange={e => setName(e.target.value)}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="type">Horas</FormLabel>
                      <TextField
                        size="small"
                        type="number"
                        placeholder="Ex: 100"
                        onChange={e => setHours(parseInt(e.target.value))}
                        required
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="Sexo">Nivel</FormLabel>
                      <TextField
                        select
                        size="small"
                        defaultValue="Tecnico"
                        // required

                        onChange={e => setLevel(e.target.value.toUpperCase())}
                      >
                        <MenuItem value={"Tecnico"}>Tecnico</MenuItem>
                        <MenuItem value={"Bacharel"}>Bacharel</MenuItem>
                        <MenuItem value={"Licenciatura"}>Licenciatura</MenuItem>
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="Sexo">Grau</FormLabel>
                      <TextField
                        select
                        size="small"
                        defaultValue="Superior"
                        // required
                        onChange={e => setGrade(e.target.value.toUpperCase())}
                      >
                        <MenuItem value={"Superior"}>Superior</MenuItem>
                        <MenuItem value={"Medio"}>Medio</MenuItem>
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
                          Salvar
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ ":hover": { bgcolor: "red" } }}
                          onClick={() => Router.push(PATHS.COURSES)}
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

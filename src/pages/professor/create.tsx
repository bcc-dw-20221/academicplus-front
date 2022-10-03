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
import { registerProfessor } from "../../services/professorService";
import { getAllUniversities } from "../../services/universityService";
import { getAllPreRecords } from "../../services/preRegisterService";
import { toast } from "react-toastify";
import { PATHS, TEXTS } from "../../utils/constants";
import Router from "next/router";

export default function CreateProfessor() {
  const [CPF, setCPF] = useState("");
  const [universities, setUniversities] = useState<any[]>([]);
  const [qualifications, setQualilfications] = useState<string[]>([]);
  const [universityName, setUniversityName] = useState("");
  const [preRecords, setPreRecords] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllUniversities();
        const dataPreRecords = await getAllPreRecords();

        setPreRecords(dataPreRecords);
        setUniversities(data);
      } catch (error) {
        toast.error(TEXTS.ERROR, {
          autoClose: 2000
        });
      }
    })();
  }, []);

  const universityId = universities.filter(item =>
    item?.name.includes(universityName)
  );
  const cpfExists = preRecords.filter(item => item?.id?.value === CPF);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(universityId[0].id.value, qualifications);
    try {
      if (cpfExists) {
        if (universityId && CPF && qualifications) {
          await registerProfessor(
            CPF,
            universityId[0].id.value,
            qualifications
          );
          toast.success(TEXTS.REGISTER_SUCESS, {
            autoClose: 2000
          });
        }
      }
    } catch (error) {
      toast.error(TEXTS.ERROR, {
        autoClose: 2000
      });
    }
    Router.push(PATHS.PROFESSOR);
  };

  return (
    <Container fixed>
      <Text fontSize="2rem">{`${"Cadastro"} de Professor`}</Text>
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
                      <FormLabel htmlFor="Sexo">Universidades</FormLabel>
                      <TextField
                        select
                        size="small"
                        defaultValue="Selecione uma Universidade"
                        // required
                        onChange={e => setUniversityName(e.target.value)}
                      >
                        <MenuItem disabled value="Selecione uma Universidade">
                          Selecione uma Universidade
                        </MenuItem>
                        {universities.map(university => {
                          return (
                            <MenuItem
                              key={university.id.value}
                              value={university?.name}
                            >
                              {university?.name}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="type">Qualificações</FormLabel>
                      <TextField
                        size="small"
                        placeholder="Ex: Mestre em IA"
                        required
                        onChange={e =>
                          setQualilfications([
                            ...qualifications,
                            e.target.value
                          ])
                        }
                      ></TextField>
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
                          onClick={() => Router.push(PATHS.PROFESSOR)}
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

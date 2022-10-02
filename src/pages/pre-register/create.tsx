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
  TextField,
} from "@mui/material";
import { Text, Button as ButtonChakra } from "@chakra-ui/react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { registerUniversity } from "../../services/universityService";

import { toast } from "react-toastify";
import { PATHS, TEXTS } from "../../utils/constants";
import Router from "next/router";
import { registerPerson } from "../../services/preRegisterService";

export default function CreatePreRegister() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [sex, setSex] = useState("");
  const [motherName, setMotherName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAdress] = useState({
    street: "",
    number: "",
    zipCode: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        name &&
        cpf &&
        sex &&
        motherName &&
        email &&
        birthDate &&
        address.street &&
        address.number &&
        address.zipCode
      ) {
        await registerPerson(
          name,
          cpf,
          sex,
          motherName,
          email,
          birthDate,
          address
        );
        toast.success(TEXTS.REGISTER_SUCESS, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error(TEXTS.ERROR, {
        autoClose: 2000,
      });
    }
    Router.push(PATHS.PRE_REGISTER);
  };

  return (
    <Container fixed>
      <Text>{`${"Cadastro"} de Pessoa`}</Text>
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
                        onChange={(e) => setName(e.target.value)}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="type">CPF</FormLabel>
                      <TextField
                        size="small"
                        placeholder="Ex: 111.111.111-11"
                        onChange={(e) => setCpf(e.target.value)}
                        required
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="Sexo">Sexo</FormLabel>
                      <TextField
                        select
                        size="small"
                        defaultValue="Feminino"
                        // required
                        onChange={(e) =>
                          setSex(
                            e.target.value === "Masculino" ? "MALE" : "FEMALE"
                          )
                        }
                      >
                        <MenuItem value={"Masculino"}>Masculino</MenuItem>
                        <MenuItem value={"Feminino"}>Feminino</MenuItem>
                        {/* <MenuItem value={"Outro"}>Outro</MenuItem> */}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="type">Nome da Mãe</FormLabel>
                      <TextField
                        size="small"
                        placeholder="Ex: Fransquinha da Avon"
                        onChange={(e) => setMotherName(e.target.value)}
                        required
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="type">Email</FormLabel>
                      <TextField
                        size="small"
                        placeholder="Ex: seuemail@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="type">Data de nascimento</FormLabel>
                      <TextField
                        type="date"
                        size="small"
                        placeholder="Ex: 06/08/1999"
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="type">Rua</FormLabel>
                      <TextField
                        size="small"
                        placeholder="Ex: Travessa Felismino"
                        onChange={(e) =>
                          setAdress((prevState) => {
                            return { ...prevState, street: e.target.value };
                          })
                        }
                        required
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="type">Número</FormLabel>
                      <TextField
                        type="number"
                        size="small"
                        placeholder="Ex: 255"
                        onChange={(e) =>
                          setAdress((prevState) => {
                            return { ...prevState, number: e.target.value };
                          })
                        }
                        required
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item sm={6}>
                    <FormControl fullWidth>
                      <FormLabel htmlFor="type">CEP</FormLabel>
                      <TextField
                        size="small"
                        placeholder="Ex: 62.800-000"
                        onChange={(e) =>
                          setAdress((prevState) => {
                            return { ...prevState, zipCode: e.target.value };
                          })
                        }
                        required
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
                          onClick={() => Router.push(PATHS.PRE_REGISTER)}
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

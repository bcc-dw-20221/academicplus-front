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
import { registerUniversity } from "../../services/universityService";
import { toast } from "react-toastify";
import { PATHS, TEXTS } from "../../utils/constants";
import Router from "next/router";

export default function CreateUniversity() {
  const [name, setName] = useState("");
  // const [street, setStreet] = useState("");
  // const [number, setNumber] = useState("");
  // const [zipCode, setZipCode] = useState("");
  const [address, setAdress] = useState({
    street: "",
    number: "",
    zipCode: ""
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (name && address.street && address.number && address.zipCode) {
        await registerUniversity(name, address);
        toast.success(TEXTS.REGISTER_SUCESS, {
          autoClose: 2000
        });
      } else {
        toast.error(TEXTS.ERROR, {
          autoClose: 2000
        });
      }
    } catch (error) {
      console.log(address);
      toast.error(TEXTS.ERROR, {
        autoClose: 2000
      });
    }
    Router.push(PATHS.UNIVERSITY);
  };

  return (
    <Container fixed>
      <Text fontSize="2rem">{`${"Cadastro"} de Universidade`}</Text>
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
                      <FormLabel htmlFor="type">Rua</FormLabel>
                      <TextField
                        size="small"
                        placeholder="Ex: Travessa Felismino"
                        onChange={e =>
                          setAdress(prevState => {
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
                        onChange={e =>
                          setAdress(prevState => {
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
                        onChange={e =>
                          setAdress(prevState => {
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
                          onClick={() => Router.push(PATHS.UNIVERSITY)}
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

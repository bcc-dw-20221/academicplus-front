import React from "react";
import { Button, Container, Flex, List, ListItem } from "@chakra-ui/react";
import Router from "next/router";
import { PATHS } from "../../utils/constants";
export default function Home() {
  return (
    <Flex>
      <List>
        <ListItem _hover={{ bg: "blue" }}>
          <Button onClick={() => Router.push(PATHS.UNIVERSITY)}>
            University
          </Button>
        </ListItem>
        <ListItem _hover={{ bg: "green" }}>
          <Button onClick={() => Router.push(PATHS.PRE_REGISTER)}>
            Pre-Registro
          </Button>
        </ListItem>
        <ListItem _hover={{ bg: "green" }}>
          <Button onClick={() => Router.push(PATHS.COURSES)}>Cursos</Button>
        </ListItem>
        <ListItem _hover={{ bg: "green" }}>
          <Button onClick={() => Router.push(PATHS.LOGIN)}>Login</Button>
        </ListItem>
      </List>
    </Flex>
  );
}

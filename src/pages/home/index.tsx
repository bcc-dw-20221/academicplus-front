import React from "react";
import { Button, Container, Flex, List, ListItem } from "@chakra-ui/react";
import Router from "next/router";
import { PATHS } from "../../utils/constants";
export default function Home() {
  const items = [
    { id: 1, title: "University", path: PATHS.UNIVERSITY },
    { id: 2, title: "Pre-Registro", path: PATHS.PRE_REGISTER },
    { id: 3, title: "Professor", path: PATHS.PROFESSOR },
    { id: 4, title: "Cursos", path: PATHS.COURSES },
    { id: 5, title: "Aluno", path: PATHS.STUDENT }
  ];

  return (
    <Flex>
      <List>
        {items.map((item: any) => {
          return (
            <ListItem key={item.id}>
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
                onClick={() => Router.push(item.path)}
              >
                {item.title}
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Flex>
  );
}

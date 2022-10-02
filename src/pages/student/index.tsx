import Router from "next/router";
import { toast } from "react-toastify";
import { PATHS } from "../../utils/constants";
import { Button, Container, Flex } from "@chakra-ui/react";
export default function Student() {
  return (
    <Container gap="1rem">
      <Button
        fontSize="2rem"
        _hover={{ bg: "blue" }}
        onClick={() => Router.push(PATHS.FORM_STUDENT)}
      >
        Cadastrar um Aluno
      </Button>
      <Flex>
        <Button
          fontSize="2rem"
          backgroundColor="#000000"
          _hover={{ bg: "red" }}
          onClick={() => Router.push(PATHS.HOME)}
        >
          Home
        </Button>
      </Flex>
    </Container>
  );
}

import { Flex, HStack, Image, Link, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { PATHS } from "../utils/constants";
function Header() {
  return (
    <Flex
      justify="space-between"
      px={10}
      py={5}
      fontSize={{ base: "12px", md: "16px", lg: "18px" }}
      wrap="wrap"
      width="100vw"
      // position="fixed"
      height="5rem"
      top="0"
      boxShadow="1px 3px #E2E8F0"
    >
      <HStack>
        <Link href="/">
          <Image src="/LogoAcademicPlus.png" fontWeight={700} marginLeft={4} />
        </Link>
      </HStack>

      <HStack>
        <NextLink href={PATHS.LOGIN}>
          <Button
            height={0}
            fontSize={{ base: "11px", md: "12px", lg: "13px" }}
            backgroundColor="#fff"
            color="blue"
            // border="1px solid blue"
            // borderRadius={200}
            padding={3}
            paddingInlineStart={0}
            paddingInlineEnd={0}
          >
            Entrar
          </Button>
        </NextLink>
        <Text>ou</Text>
        <Link color="blue">Cadastre-se</Link>
      </HStack>
    </Flex>
  );
}

export default Header;

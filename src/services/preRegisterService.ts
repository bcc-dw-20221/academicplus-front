import axios from "../config/axios";

interface address {
  street: string;
  number: string;
  zipCode: string;
}

async function registerPerson(
  name: string,
  cpf: string,
  sex: string,
  motherName: string,
  email: string,
  birthDate: string,
  address: address
) {
  const person = await axios.post("/pre-register", {
    name,
    cpf,
    sex,
    motherName,
    email,
    birthDate,
    address,
  });
  return person.data;
}

export { registerPerson };

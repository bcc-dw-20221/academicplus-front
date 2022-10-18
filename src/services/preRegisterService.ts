import { instanceAxios } from "./axiosService";

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
  const person = await instanceAxios.post("/pre-register", {
    name,
    cpf,
    sex,
    motherName,
    email,
    birthDate,
    address
  });
  return person.data;
}

async function getAllPreRecords() {
  const preRecords = await instanceAxios.get("/pre-register");
  return preRecords.data;
}

export { registerPerson, getAllPreRecords };

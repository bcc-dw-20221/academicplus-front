import { instanceapi } from "./api";

interface address {
  street: string;
  number: string;
  zipCode: string;
}

async function registerUniversity(name: string, address: address) {
  console.log(address);
  const university = await instanceapi.post("/universities", {
    name,
    address
  });
  return university.data;
}

async function getAllUniversities() {
  const universities = await instanceapi.get("/universities");

  return universities.data;
}

export { registerUniversity, getAllUniversities };

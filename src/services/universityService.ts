import { api } from "./axios";

interface address {
  street: string;
  number: string;
  zipCode: string;
}

async function registerUniversity(name: string, address: address) {
  console.log(address);
  const university = await api.post("/universities", {
    name,
    address
  });
  return university.data;
}

async function getAllUniversities() {
  const universities = await api.get("/universities");

  return universities.data;
}

export { registerUniversity, getAllUniversities };

import Header from "../components/Header";
import axios from "../config/axios";

interface address {
  street: string;
  number: string;
  zipCode: string;
}

async function registerUniversity(name: string, address: address) {
  console.log(address);
  const university = await axios.post("/universities", {
    name,
    address,
  });
  return university.data;
}

async function getAllUniversities() {
  const universities = await axios.get("/universities");

  return universities.data;
}

export { registerUniversity, getAllUniversities };

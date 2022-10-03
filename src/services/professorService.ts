import axios from "../config/axios";

async function registerProfessor(
  personId: string,
  universityId: string,
  qualifications: Array<string>
) {
  const professor = await axios.post("/courses", {
    personId,
    universityId,
    qualifications
  });
  return professor.data;
}

export { registerProfessor };

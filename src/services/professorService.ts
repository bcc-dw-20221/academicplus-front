import { instanceAxios } from "../config/axios";

async function registerProfessor(
  personId: string,
  universityId: string,
  qualifications: Array<string>
) {
  const professor = await instanceAxios.post("/professors", {
    personId,
    universityId,
    qualifications
  });
  return professor.data;
}

export { registerProfessor };

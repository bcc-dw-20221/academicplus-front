import { api } from "./axios";

async function registerProfessor(
  personId: string,
  universityId: string,
  qualifications: Array<string>
) {
  const professor = await api.post("/professors", {
    personId,
    universityId,
    qualifications
  });
  return professor.data;
}

export { registerProfessor };

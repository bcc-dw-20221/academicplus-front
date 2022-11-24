import { instanceapi } from "./api";

async function registerProfessor(
  personId: string,
  universityId: string,
  qualifications: Array<string>
) {
  const professor = await instanceapi.post("/professors", {
    personId,
    universityId,
    qualifications
  });
  return professor.data;
}

export { registerProfessor };

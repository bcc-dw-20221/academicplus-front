import { instanceapi } from "./api";

async function registerStudent(personId: string, courseId: string) {
  const student = await instanceapi.post("/students/enrollments", {
    personId,
    courseId
  });
  return student.data;
}

export { registerStudent };

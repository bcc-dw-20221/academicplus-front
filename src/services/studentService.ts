import { api } from "./axios";

async function registerStudent(personId: string, courseId: string) {
  const student = await api.post("/students/enrollments", {
    personId,
    courseId
  });
  return student.data;
}

export { registerStudent };

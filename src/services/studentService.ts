import { instanceAxios } from "./axiosService";

async function registerStudent(personId: string, courseId: string) {
  const student = await instanceAxios.post("/students/enrollments", {
    personId,
    courseId
  });
  return student.data;
}

export { registerStudent };

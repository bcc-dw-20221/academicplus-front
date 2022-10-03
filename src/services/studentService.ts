import axios from "../config/axios";

async function registerStudent(personId: string, courseId: string) {
  const student = await axios.post("/students/enrollments", {
    personId,
    courseId
  });
  return student.data;
}

export { registerStudent };

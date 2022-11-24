import { api } from "./axios";

async function registerCourse(
  name: string,
  hours: number,
  level: string,
  grau: string
) {
  const courses = await api.post("/courses", {
    name,
    hours,
    level,
    grau
  });
  return courses.data;
}

async function getAllCourses() {
  const courses = await api.get("/courses");
  return courses.data;
}

export { registerCourse, getAllCourses };

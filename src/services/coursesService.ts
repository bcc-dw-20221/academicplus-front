import { instanceapi } from "./api";

async function registerCourse(
  name: string,
  hours: number,
  level: string,
  grau: string
) {
  const courses = await instanceapi.post("/courses", {
    name,
    hours,
    level,
    grau
  });
  return courses.data;
}

async function getAllCourses() {
  const courses = await instanceapi.get("/courses");
  return courses.data;
}

export { registerCourse, getAllCourses };

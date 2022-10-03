import axios from "../config/axios";

async function registerCourse(
  name: string,
  hours: number,
  level: string,
  grau: string
) {
  const courses = await axios.post("/courses", {
    name,
    hours,
    level,
    grau
  });
  return courses.data;
}

async function getAllCourses() {
  const courses = await axios.get("/courses");
  return courses.data;
}

export { registerCourse, getAllCourses };

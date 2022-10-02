import axios from "../config/axios";

async function registerCourse(
  name: string,
  hours: number,
  level: string,
  grade: string
) {
  const university = await axios.post("/courses", {
    name,
    hours,
    level,
    grade,
  });
  return university.data;
}

async function getAllCourses() {
  const courses = await axios.get("/courses");
  return courses.data;
}

export { registerCourse, getAllCourses };

import {
  createCourse,
  deleteCourseService,
  getCourses,
  updateCourseService,
} from "../../services";
import {
  deleteCourse,
  saveCourse,
  setCourses,
  updateCourse,
} from "../slices/coursesSlice";

export const updateCourseThunk = (courseData, token, courseId) => {
  return async (dispatch) => {
    const course = await updateCourseService(courseData, token, courseId);
    dispatch(updateCourse(course));
  };
};

export const deleteCourseThunk = (id, token) => {
  return async (dispatch) => {
    const result = await deleteCourseService(id, token);

    if (result) {
      dispatch(deleteCourse(id));
    }
  };
};

export const createCourseThunk = (courseData, token) => {
  return async (dispatch) => {
    const course = await createCourse(courseData, token);
    dispatch(saveCourse(course));
  };
};

export const getCoursesThunk = () => {
  return async (dispatch) => {
    const courses = await getCourses();

    dispatch(setCourses(courses));
  };
};

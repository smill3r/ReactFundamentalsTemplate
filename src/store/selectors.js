// Module 3:
// * create selectors

export const getCoursesSelector = (state) => state.courses;
export const getCourseByIdSelector = (state, id) =>
  state.courses.find((course) => course.id === id);
export const getAuthorsSelector = (state) => state.authors;
export const getUserNameSelector = (state) => state.user.name;
export const getUserRoleSelector = (state) => state.user.role;
export const getUserTokenSelector = (state) => state.user.token;

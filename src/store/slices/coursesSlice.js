import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      return action.payload;
    },
    saveCourse: (state, action) => {
      state.push(action.payload);
    },
    deleteCourse: (state, action) => {
      return state.filter((course) => course.id !== action.payload);
    },
    //updateCourse:
  },
});

// use these actions in your components / thunks
export const { setCourses, saveCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;

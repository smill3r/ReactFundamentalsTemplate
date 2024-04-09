import { mockedCourse } from "../../testUtils";
import {
  coursesSlice,
  deleteCourse,
  saveCourse,
  setCourses,
  updateCourse,
} from "../slices/coursesSlice";

jest.mock("../../services");

describe("Courses slice", () => {
  it("setCourses", () => {
    const initialState = [];
    const expectedCourses = [mockedCourse];
    expect(
      coursesSlice.reducer(initialState, setCourses(expectedCourses))
    ).toEqual(expectedCourses);
  });

  it("saveCourse", () => {
    const initialState = [];
    expect(
      coursesSlice.reducer(initialState, saveCourse(mockedCourse))
    ).toEqual([mockedCourse]);
  });

  it("deleteCourse", () => {
    expect(
      coursesSlice.reducer([mockedCourse], deleteCourse(mockedCourse.id))
    ).toEqual([]);
  });

  it("updateCourse", () => {
    const updated = { ...mockedCourse, title: "updated title" };
    expect(coursesSlice.reducer([mockedCourse], updateCourse(updated))).toEqual(
      [updated]
    );
  });
});

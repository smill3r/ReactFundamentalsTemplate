import thunk from "redux-thunk";
import { mockedCourse, mockedCoursesList } from "../../testUtils";
import {
  coursesSlice,
  deleteCourse,
  saveCourse,
  setCourses,
  updateCourse,
} from "../slices/coursesSlice";
import {
  createCourse,
  deleteCourseService,
  getCourses,
  updateCourseService,
} from "../../services";
import {
  createCourseThunk,
  deleteCourseThunk,
  getCoursesThunk,
  updateCourseThunk,
} from "../thunks/coursesThunk";
import configureMockStore from "redux-mock-store";

jest.mock("../../services");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Courses thunk", () => {
  it("dispatch get courses thunk", async () => {
    const store = mockStore({ courses: [] });
    getCourses.mockResolvedValueOnce(mockedCoursesList);

    await store.dispatch(getCoursesThunk());

    const actions = store.getActions();
    expect(actions[0]).toEqual(setCourses(mockedCoursesList));
  });

  it("dispatch create courses thunk", async () => {
    const store = mockStore({ courses: [] });
    createCourse.mockResolvedValueOnce(mockedCourse);

    await store.dispatch(createCourseThunk());

    const actions = store.getActions();
    expect(actions[0]).toEqual(saveCourse(mockedCourse));
  });

  it("update create courses thunk", async () => {
    const store = mockStore({ courses: [mockedCourse] });
    const updatedCourse = { ...mockedCourse, title: "updated title" };
    updateCourseService.mockResolvedValueOnce(updatedCourse);

    await store.dispatch(updateCourseThunk());

    const actions = store.getActions();
    expect(actions[0]).toEqual(updateCourse(updatedCourse));
  });

  it("dispatch delete courses thunk", async () => {
    const store = mockStore({ courses: [mockedCourse] });
    deleteCourseService.mockResolvedValueOnce(true);

    await store.dispatch(deleteCourseThunk(mockedCourse.id, "token"));

    const actions = store.getActions();
    expect(actions[0]).toEqual(deleteCourse(mockedCourse.id));
  });

  it("dispatch delete courses thunk and not call action", async () => {
    const store = mockStore({ courses: [mockedCourse] });
    deleteCourseService.mockResolvedValueOnce(false);

    await store.dispatch(deleteCourseThunk(mockedCourse.id, "token"));

    const actions = store.getActions();
    expect(actions[0]).toEqual(undefined);
  });
});

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

import { render, screen } from "@testing-library/react";
import { CourseInfo } from "../CourseInfo";
import { mockedCourse, mockedStore } from "../../../testUtils";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("CourseInfo", () => {
  it("should have course title", async () => {
    render(
      <Provider store={mockedStore}>
        <MemoryRouter initialEntries={[`/courses/${mockedCourse.id}`]}>
          <Routes>
            <Route path={`/courses/:courseId`} element={<CourseInfo />}></Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const title = await screen.findByText(mockedCourse.title);

    expect(title).toBeTruthy();
  });
});

import { render, screen } from "@testing-library/react";
import { Courses } from "../Courses";
import { MockedWrapper, mockedCoursesList } from "../../../testUtils";

describe("Courses", () => {
  it("should display amount of CourseCard equal length of courses array", async () => {
    render(<Courses />, { wrapper: MockedWrapper });

    const courseCards = await screen.queryAllByTestId("courseCard");

    expect(courseCards).toHaveLength(mockedCoursesList.length);
  });
});

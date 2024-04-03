import { render, screen } from "@testing-library/react";
import { CourseCard } from "../CourseCard";
import {
  MockedWrapper,
  mockedAuthors,
  mockedCourse,
  mockedCourseAuthors,
} from "../../../../../testUtils";
import { formatCreationDate, getCourseDuration } from "../../../../../helpers";

describe("CourseCard", () => {
  beforeEach(() => {
    render(
      <CourseCard
        course={mockedCourse}
        authorsList={mockedAuthors}
      ></CourseCard>,
      { wrapper: MockedWrapper }
    );
  });

  it("should display title", async () => {
    const title = await screen.findByText(mockedCourse.title);

    expect(title).toBeTruthy();
  });

  it("should display description", async () => {
    const description = await screen.findByText(mockedCourse.description);

    expect(description).toBeTruthy();
  });

  it("should display duration in the correct format", async () => {
    const duration = await screen.findByTestId("duration");

    expect(duration.textContent).toEqual(
      getCourseDuration(mockedCourse.duration)
    );
  });

  it("should display authors list", async () => {
    const expectedList = mockedCourseAuthors
      .map((author) => {
        return `${author.name}`;
      })
      .join(", ");

    const authorsList = await screen.getByText(expectedList);

    expect(authorsList).toBeTruthy();
  });

  it("should display created date in the correct format", async () => {
    const date = await screen.findByText(
      formatCreationDate(mockedCourse.creationDate)
    );

    expect(date).toBeTruthy();
  });
});

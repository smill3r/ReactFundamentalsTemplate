import { fireEvent, render, screen } from "@testing-library/react";
import { CourseForm } from "../CourseForm";
import { MockedWrapper } from "../../../testUtils";

describe("CourseForm", () => {
  beforeEach(() => {
    render(<CourseForm />, { wrapper: MockedWrapper });
  });

  const setFormData = jest.fn();

  const formData = {
    title: "",
    description: "",
    duration: "",
  };

  it("title should be create course when loaded without course id", () => {
    const text = screen.getByText("Create course");
    expect(text).toBeTruthy();
  });

  it("should render title input", async () => {
    const input = await screen.findByTestId("titleInput");

    expect(input).toBeTruthy();
  });

  it("should render description input", async () => {
    const input = await screen.findByTestId("descriptionTextArea");

    expect(input).toBeTruthy();
  });

  it("should render duration input", async () => {
    const input = await screen.findByTestId("durationInput");

    expect(input).toBeTruthy();
  });

  it("should render create course button", async () => {
    const button = await screen.findByTestId("createCourseButton");

    expect(button).toBeTruthy();
  });
});

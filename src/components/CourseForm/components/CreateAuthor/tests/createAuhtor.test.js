import { fireEvent, render, screen } from "@testing-library/react";
import { CreateAuthor } from "../CreateAuhtor";
import { MockedWrapper } from "../../../../../testUtils";

describe("CreateAuhtor", () => {
  beforeEach(() => {});

  it("should have label", async () => {
    render(<CreateAuthor />, { wrapper: MockedWrapper });
    const label = await screen.getByText("Author Name");

    expect(label).toBeTruthy();
  });

  it("should call author creation function with new author", async () => {
    const onCreateAuthor = jest.fn();
    render(<CreateAuthor onCreateAuthor={onCreateAuthor} />, {
      wrapper: MockedWrapper,
    });

    const input = await screen.getByTestId("createAuthorInput");

    fireEvent.change(input, { target: { value: "Andy" } });

    const button = await screen.getByTestId("createAuthorButton");

    fireEvent.click(button);

    expect(onCreateAuthor).toHaveBeenCalledWith("Andy");
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { AuthorItem } from "../AuthorItem";
import { MockedWrapper, mockedAuthors } from "../../../../../testUtils";

describe("AuthorItem", () => {
  const author = mockedAuthors[0];
  const addAuthor = jest.fn();
  const removeAuthor = jest.fn();

  it("should display author name", async () => {
    render(<AuthorItem author={author} />, { wrapper: MockedWrapper });
    const authorName = await screen.getByText(author.name);

    expect(authorName).toBeTruthy();
  });

  it("should call add author with author", () => {
    render(<AuthorItem author={author} addAuthor={addAuthor} />, {
      wrapper: MockedWrapper,
    });

    fireEvent.click(screen.getByText("+"));

    expect(addAuthor).toHaveBeenCalledWith(author);
  });

  it("should call remove author with author", () => {
    render(<AuthorItem author={author} removeAuthor={removeAuthor} />, {
      wrapper: MockedWrapper,
    });

    fireEvent.click(screen.getByText("-"));

    expect(removeAuthor).toHaveBeenCalledWith(author);
  });
});

import { findByAltText, render, screen } from "@testing-library/react";
import { Header } from "../Header";
import { MockedWrapper, mockedUser } from "../../../testUtils";

describe("Header", () => {
  it("should have a logo", async () => {
    render(<Header></Header>, { wrapper: MockedWrapper });
    const logo = await screen.findByAltText("logo");
    expect(logo).toBeTruthy();
  });

  it("should have user name", async () => {
    render(<Header></Header>, { wrapper: MockedWrapper });

    const userName = await screen.findByText(mockedUser.name);

    expect(userName).toBeTruthy();
  });
});

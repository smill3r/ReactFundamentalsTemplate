import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Registration } from "../Registration";
import { MockedWrapper, mockedUser } from "../../../testUtils";
import * as API from "../../../services";

describe("Registration", () => {
  beforeEach(() => {
    render(<Registration />, { wrapper: MockedWrapper });
  });

  it("should not submit if form is incomplete", async () => {
    const mockLoginService = jest
      .spyOn(API, "createUser")
      .mockReturnValueOnce({ successful: true });
    const button = await screen.getByText("REGISTER");

    fireEvent.click(button);

    expect(mockLoginService).not.toHaveBeenCalled();
  });

  it("should submit form", async () => {
    const mockLoginService = jest
      .spyOn(API, "createUser")
      .mockReturnValueOnce({ successful: true });

    const nameInput = await screen.getByPlaceholderText("Input name");
    const emailInput = await screen.getByPlaceholderText("Input email");
    const passwordInput = await screen.getByPlaceholderText("Input password");
    const button = await screen.getByText("REGISTER");

    fireEvent.change(nameInput, { target: { value: mockedUser.name } });
    fireEvent.change(emailInput, { target: { value: mockedUser.email } });
    fireEvent.change(passwordInput, { target: { value: "mockPassword" } });

    await waitFor(() => {
      fireEvent.click(button);
      expect(mockLoginService).toHaveBeenCalled();
    });
  });
});

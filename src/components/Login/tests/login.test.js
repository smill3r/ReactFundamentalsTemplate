import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Login } from "../Login";
import { MockedWrapper, mockedUser } from "../../../testUtils";

import * as API from "../../../services";

describe("Login", () => {
  var inputEmail;
  var inputPassword;
  var button;
  var mockLoginService;
  beforeEach(async () => {
    render(<Login />, { wrapper: MockedWrapper });

    inputEmail = await screen.getByPlaceholderText("Input email");
    inputPassword = await screen.getByPlaceholderText("Input password");
    button = await screen.getByText("LOGIN");
    mockLoginService = jest
      .spyOn(API, "login")
      .mockReturnValueOnce({ successful: true });
  });

  const formData = {
    email: "potato",
    password: "tomato",
  };

  it("should submit form with user log info", async () => {
    fireEvent.change(inputEmail, { target: { value: formData.email } });
    fireEvent.change(inputPassword, { target: { value: formData.password } });
    await waitFor(() => {
      fireEvent.click(button);
      expect(mockLoginService).toHaveBeenCalledWith(formData);
    });
  });

  it("should not submit if password is missing", async () => {
    fireEvent.change(inputEmail, { target: { value: formData.email } });
    await waitFor(() => {
      fireEvent.click(button);
      expect(mockLoginService).not.toHaveBeenCalled();
    });
  });

  it("should not submit if email is missing", async () => {
    fireEvent.change(inputPassword, { target: { value: formData.password } });
    await waitFor(() => {
      fireEvent.click(button);
      expect(mockLoginService).not.toHaveBeenCalled();
    });
  });
});

import { userSlice, removeUserData, setUserData } from "../slices/userSlice";

describe("User slice", () => {
  it("sets user data", () => {
    const initialState = {
      isAuth: false,
      name: "",
      email: "",
      token: "",
      role: "",
    };
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    };
    expect(userSlice.reducer(initialState, setUserData(userData))).toEqual({
      ...userData,
      isAuth: true,
      token: initialState.token,
    });
  });

  it("removes user data", () => {
    const initialState = {
      isAuth: true,
      name: "John Doe",
      email: "john@example.com",
      token: "token123",
      role: "admin",
    };
    expect(userSlice.reducer(initialState, removeUserData())).toEqual({
      isAuth: false,
      name: "",
      email: "",
      token: "",
      role: "",
    });
  });
});

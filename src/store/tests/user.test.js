import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { userSlice, removeUserData, setUserData } from "../slices/userSlice";
import { getCurrentUser, logout } from "../../services";
import { mockedUser } from "../../testUtils";
import { getUserThunk, logoutThunk } from "../thunks/userThunk";
jest.mock("../../services");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("user thunk", () => {
  it("dispatch get user thunk", async () => {
    const store = mockStore({ user: {} });
    getCurrentUser.mockResolvedValueOnce(mockedUser);

    await store.dispatch(getUserThunk("token"));

    const actions = store.getActions();
    expect(actions[0]).toEqual(setUserData(mockedUser));
  });

  it("dispatch logout user thunk", async () => {
    const store = mockStore({ user: mockedUser });
    logout.mockResolvedValueOnce(mockedUser);

    await store.dispatch(logoutThunk("token"));

    const actions = store.getActions();
    expect(actions[0]).toEqual(removeUserData(mockedUser));
  });
});

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

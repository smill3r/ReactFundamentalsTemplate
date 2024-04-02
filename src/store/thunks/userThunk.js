import { getCurrentUser, logout } from "../../services";
import { removeUserData, setUserData } from "../slices/userSlice";

export const getUserThunk = (token) => {
  return async (dispatch) => {
    const user = await getCurrentUser(token);
    dispatch(setUserData(user));
  };
};

export const logoutThunk = (token) => {
  return async (dispatch) => {
    const user = await logout(token);
    dispatch(removeUserData(user));
  };
};

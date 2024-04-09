import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token"),
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return {
        ...action.payload,
        token: state.token,
        isAuth: true,
      };
    },
    removeUserData: (state, action) => {
      return { ...initialState, token: "" };
    },
  },
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;

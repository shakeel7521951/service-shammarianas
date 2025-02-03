import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;

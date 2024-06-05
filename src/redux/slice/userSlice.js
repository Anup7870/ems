import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: null,
   error: null,
   loading: false,
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      signInStart: (state) => {
         state.loading = true;
         state.error = null;
      },
      signInSuccess: (state, action) => {
         state.loading = false;
         state.user = action.payload;
      },
      signInFailure: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      signOutUser: (state) => {
         state.user = null;
         state.error = null;
         state.loading = false;
      },
   },
});

export const { signInStart, signInSuccess, signInFailure, signOutUser } =
   userSlice.actions;

export default userSlice.reducer;

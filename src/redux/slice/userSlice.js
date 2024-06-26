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
      signupStart: (state) => {
         state.loading = true;
         state.error = null;
      },
      singupSucess: (state) => {
         state.loading = false;
         state.error = false;
      },
      signupFailure: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export const {
   signInStart,
   signInSuccess,
   signInFailure,
   signOutUser,
   signupStart,
   signupFailure,
   singupSucess,
} = userSlice.actions;

export default userSlice.reducer;

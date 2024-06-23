// for step form state

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   events: null,
   error: null,
   loading: null,
};

const formStateSlice = createSlice({
   name: "events",
   initialState,
   reducers: {
      apiCalling: (state) => {
         state.loading = true;
         state.error = null;
      },
      apiSucessfull: (state, action) => {
         state.loading = false;
         state.events = action.payload;
      },
      apiFailure: (state, action) => {
         (state.loading = false), (state.error = action.payload);
      },
   },
});

export const { apiCalling, apiSucessfull, apiFailure } = formStateSlice.actions;
export default formStateSlice.reducer;

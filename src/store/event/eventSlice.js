// userInputSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events: [],
    
};

const userEventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
      updateEventState: (state, action) => {
        console.log(action.payload);
        state.events = action.payload;
      },
    },
  });

export const {  updateEventState } = userEventSlice.actions;
export default userEventSlice.reducer;

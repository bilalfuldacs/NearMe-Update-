// userInputSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
  contact:''
};

const userInputSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      updateState: (state, action) => {
        console.log('Action Payload:', action.payload); // Log the action payload
        const { username, email, password, contact } = action.payload;
        state.username = username;
        state.email = email;
        state.password = password;
        state.contact = contact;
      },
    },
  });

export const {  updateState } = userInputSlice.actions;
export default userInputSlice.reducer;

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: '',
};

const  userSlice = createSlice( {
  name: "user",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = (action.payload)
    }
  }
})

export const { saveToken } = userSlice.actions

export default userSlice.reducer
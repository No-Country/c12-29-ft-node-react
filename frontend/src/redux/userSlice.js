import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: '',
  accountType: '',
  user: ''
};

const  userSlice = createSlice( {
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.accountType = action.payload.accountType
      state.token = action.payload.token
      state.user = action.payload.user
      console.log("payload en userSlice", action.payload)
    }
  }
})

export const { saveUser } = userSlice.actions

export default userSlice.reducer
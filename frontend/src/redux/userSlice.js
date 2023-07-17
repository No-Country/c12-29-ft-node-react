import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: '',
  /* accountType: '' */
};

const  userSlice = createSlice( {
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      console.log("ACTION: ", action)
      state.token = action.payload.token
      /* state.accountType = action.payload.accountType */
      console.log(token, "// ", accountType)
    }
  }
})

export const { saveUser } = userSlice.actions

export default userSlice.reducer
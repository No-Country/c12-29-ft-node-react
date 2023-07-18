import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: '',
  accountType: ''
};

const  userSlice = createSlice( {
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      /* console.log("ACTION: ", action) */
      state.accountType = action.payload.accountType
      state.token = action.payload.token
      /* console.log(token, "// ", accountType) */
      console.log("payload en userSlice", action.payload)
      
    }
  }
})

export const { saveUser } = userSlice.actions

export default userSlice.reducer
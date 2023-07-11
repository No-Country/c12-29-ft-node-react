import { createSlice} from '@reduxjs/toolkit'

const  initialState = {
    name:"",
    email:""
};

const userSlice = createSlice({
    name:"user",
    initialState
});

export default userSlice
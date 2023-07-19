import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { userApi } from './userReducer'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    user:userSlice,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware)
})

setupListeners(store.dispatch)

export default store;

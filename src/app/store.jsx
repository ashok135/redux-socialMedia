import {configureStore} from "@reduxjs/toolkit"
import postReducer from "../feature/posts/postsSlice"
import userReducer from "../feature/users/usersSlice"
 
export const store = configureStore({
    reducer:{
        posts:postReducer,
        users:userReducer

     }
})
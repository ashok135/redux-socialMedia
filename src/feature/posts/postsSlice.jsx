import { createSlice, nanoid,createAsyncThunk } from '@reduxjs/toolkit'
import {sub} from "date-fns"
import axios from "axios"
 
 
 
 const initialState = {
  posts:[],
  status:"idle",
 error:null
  
 
  
 }
 const POSTS_URL='https://jsonplaceholder.typicode.com/posts'


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async()=>
  {
  const response = await axios.get(POSTS_URL)
  return response.data

  })
 export const addNewPost = createAsyncThunk("posts/addNewPost",async(initialPost)=>{
  const response = await axios.post(POSTS_URL,initialPost)
  return response.data

 })

 export const upadatePost = createAsyncThunk("posts/updatePost",async(initialPost)=>{
  const {id}=initialPost
  const response = await axios.put(`${POSTS_URL}/${id}`,initialPost)
  return response.data
 })

 export const deletePost = createAsyncThunk("posts/deletePost",async (postId)=>{
  
  await axios.delete(`${POSTS_URL}/${postId}`)
   return  postId
 })

 const postsSlice = createSlice({
  name:"posts",
  initialState,
  reducers:{
    reactionAdded(state,action){
    const {postId,reaction} = action.payload
    const existingPost = state.posts.find((post)=>post.id==postId)
    if(existingPost){
      existingPost.reactions[reaction]++
    }
  }



  },
  extraReducers(builder){
    builder
       .addCase(fetchPosts.pending,(state,action)=>{

        state.status='loading'
       })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
          state.status='succeeded'
          const loadedPosts = action.payload.map((post)=>{
            post.date =new Date().toISOString()
            post.body
            post.reactions= {
                  thumbsUp: 0,
                  wow: 0,
                  heart: 0,
                  rocket: 0,
                  coffee: 0
                    }
                return post
          })
          state.posts =  loadedPosts

        
       })
        .addCase(fetchPosts.rejected,(state,action)=>{
          state.status="failed"
          state.error = action.error.message
        
       })
       .addCase(addNewPost.fulfilled,(state,action)=>{
        const sortedPosts = state.posts.sort((a, b) => {
    if (a.id > b.id) return 1
    if (a.id < b.id) return -1
    return 0
})
action.payload.id = sortedPosts[sortedPosts.length-1].id+1
action.payload.userId = Number(action.payload.userId)
action.payload.date= new Date().toISOString()
action.payload.reactions={
                  thumbsUp: 0,
                  wow: 0,
                  heart: 0,
                  rocket: 0,
                  coffee: 0

}
console.log(action.payload)
state.posts.push(action.payload)


       })


      .addCase(upadatePost.fulfilled, (state, action) => {
  const updatedPost = action.payload

  const existingPost = state.posts.find(post => post.id === updatedPost.id)

  if (existingPost) {
    existingPost.title = updatedPost.title
    existingPost.body = updatedPost.body
    existingPost.userId = updatedPost.userId
    existingPost.date = new Date().toISOString()
  }
})
   .addCase(deletePost.fulfilled,(state,action)=>{
    state.posts=state.posts.filter(post=>post.id !== action.payload)
   })

  }
})

  
export const postData =(state)=>state.posts.posts
export const selectPostById = (state,postId)=>state.posts.posts.find(post=>post.id==postId)
export const selectPostByUser= (state,userId)=>state.posts.posts.filter(post=>post.userId==userId)
export const getPostsStatus = (state)=> state.posts.status
export const getPostsError = (state)=>state.posts.error
export const {postAdded,reactionAdded} = postsSlice.actions

export default postsSlice.reducer
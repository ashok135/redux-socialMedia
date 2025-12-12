import { useState } from 'react'
   
 import PostList from './feature/posts/PostList'
import AddPostForm from './feature/posts/AddPostForm'
import { Routes,Route } from 'react-router-dom'
import Layout from './components/Layout'
import SinglePostPage from './feature/posts/SinglePostPage'
import EditPostPage from './feature/posts/EditPostPage'
import User from './feature/users/User'
import UserPage from './feature/users/UserPage'
 
  

function App() {



 

  return (


    <>
 <Routes>
   <Route path='/' element={<Layout/>}>
       <Route index element ={<PostList/>}/>
 
       <Route path='post'>

            <Route index element={<AddPostForm/>}/>
              <Route path='edit/:postId' element={<EditPostPage/>}/>
              <Route path=':postId' element={<SinglePostPage/>}/>
          
       </ Route>
       <Route path='users'>
        <Route index element = {<User/>}/>
        <Route path=':userId' element ={<UserPage/>}/>

       </Route>

      



 
   </Route>


 </Routes>
 


 
   
  </>
  )
 
}

export default App

import React, { useEffect } from 'react'
import { fetchPosts, postData, selectPostByUser } from '../posts/postsSlice'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PostAuthor from '../posts/PostAuthor'




function UserPage() {

     
  const {userId} =useParams()
  const dispatch  = useDispatch()
 const post = useSelector((state) => selectPostByUser(state, Number(userId)))
 
   console.log(post)
    useEffect(()=>{
    dispatch(fetchPosts())
  },[])
   
  return (
    <div>{

        post.map((post)=>{
            return(<div><li><h1>
                {post.title}
                </h1>{post.body}</li>
                <PostAuthor userId={userId}/>
                </div>)
        })
        }
        </div>
  )
}

export default UserPage
import React from 'react'
import { useSelector } from 'react-redux'
import { postData, selectPostById, selectPostByUser } from './postsSlice'
import { Link, useParams } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButton'
 
 
 

const SinglePostPage = () => {
     const {postId} = useParams()
    const post = useSelector((state)=>selectPostById(state,Number(postId)))
    console.log(post)
    
  return (
    <>

      
         {   post?   

    
              <div  className='box'>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <Link to={`/post/edit/${post.id}`}>Edit post</Link>
            <PostAuthor userId={post.userId}  />
            <p>{post.date? post.date :"dont know he titlee"}</p>
            <ReactionButtons post={post}  />

            </div>
   
        
        
    

      
    
  :"no post available"}
    </>
   
  )
}

export default SinglePostPage
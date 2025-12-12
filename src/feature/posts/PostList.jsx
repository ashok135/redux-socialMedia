 
import { useSelector,useDispatch } from 'react-redux'
import { postData,getPostsError,getPostsStatus, fetchPosts } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButton'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import User from '../users/User'
 
 
 
function PostList() {
    const dispatch= useDispatch()
    const posts = useSelector(postData)
    const users = useSelector(selectAllUsers)
    const postStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)
    const [visibleCount, setVisibleCount] = useState(20)

    
 
     
 


    
 
 
  return (
    <div> 
        { posts.length >0   ? posts.slice(0,visibleCount).map((post)=>{

        return(
              <div  className='box'>
            <h1>{post.title}</h1>
            <p>{post.body.substring(0,100)}</p>
             <Link to={`post/${post.id}`}>view post</Link>
            <PostAuthor userId={post.userId}  />
            <p>{post.date? post.date :"dont know he titlee"}</p>
            <ReactionButtons post={post}  />

        </div>
        )
        
        
    }

      
    
    ): "Loading"}

    <button onClick={()=>setVisibleCount( (pre)=>pre+20)}>LoadMore</button>
      
    </div>
  )
}

export default PostList
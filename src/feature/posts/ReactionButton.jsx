import { useDispatch} from "react-redux";
import { reactionAdded } from "./postsSlice";
import React from 'react'


const  ReactionButtons=({post}) =>{
     const reactionEmoji= {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕"
}
const dispatch = useDispatch()

const reactionButtons = ()=> {
    return(
    Object.entries(reactionEmoji).map(([name,emoji])=>{
        return(
            <button
            key={name}
            type="button"
            onClick={()=>dispatch(reactionAdded({postId:post.id,reaction:name}))}>{emoji}{post.reactions[name]?? ""}</button>
        )
    }))
}
 

  return (
    <div> {reactionButtons()}</div>
  )
}

export default ReactionButtons


 
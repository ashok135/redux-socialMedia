import { useSelector,useDispatch } from "react-redux";
 

import { selectAllUsers,fetchUsers,getUserStatus } from "../users/usersSlice";
import { useEffect } from "react";
 
 
 
 function PostAuthor( {userId}) {
    const users =useSelector(selectAllUsers)
    const userStatus = useSelector(getUserStatus)
   
    const dispatch = useDispatch()

 useEffect(()=>{
        if (  userStatus =='idle'){
            dispatch(fetchUsers())
        }
    },[userStatus,dispatch])

   const author = users.find(user=>user.id==userId)
   
         
 
 
 
   
   return (
     <div>
        { author ? author.name :"unknown author"}
     </div>
   )
 }
 
 export default PostAuthor
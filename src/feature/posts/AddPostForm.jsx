import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { addNewPost} from "./postsSlice"
import { nanoid } from "@reduxjs/toolkit"
import { selectAllUsers } from "../users/usersSlice"



  



function AddPostForm() {
    const [userId,setUserId]=useState("")
    const users = useSelector(selectAllUsers) 
    const [addRequestStatus,setAddrequestStatus]=useState("idle")

    console.log(users)
    const [formData,setFormData] = useState({
    id:null,
    title:"",
    body:""
})
const dispatch = useDispatch()
     function onAuthorChanged(e){
       setUserId(e.target.value) 

     }


     function handleChange(e){
        e.preventDefault()
    if(addRequestStatus==="idle"){
       const payload = {
      title: formData.title,
      body: formData.body,
      userId: Number(userId)
    }
        try{
            setAddrequestStatus('pending')
        dispatch(addNewPost(payload))
      
             setFormData({
                id:null,
                title:"",
                body:""

                })
                setUserId("")
    }
    catch(err){
      console.error('failed to save the post ',err);
      
    }
    finally{
        setAddrequestStatus("idle")
    }

        
   
 




    }
}

    function userOptions(){

      return(
         users.map((user)=> (
            <option key={user.id} value={user.id}>
                {user.name}
            </option>)))
   

   
         }
    
  return (
    <div>
    <div>AddPostForm</div>
    <form action="" onSubmit={handleChange}>
        <label htmlFor="postTitle">Post Titel</label>
        <input type="text" 
        id="postTitle"
        name="title"
        value={formData.title}
        required
        onChange={(e)=>{ 
            setFormData({...formData,[ e.target.name]:e.target.value})}}
        /> 
        <br></br>
        <label htmlFor="postContent">Post Content</label>
         <input type="text" 
        id="postCopntent"
        name="body"
        required
        value={formData.body}
        onChange={(e)=>{ 
            setFormData({...formData,[ e.target.name]:e.target.value})}}
        /><br></br>
        <label for="userId" >slect the author</label>
        <select id="userId" value={userId} onChange={onAuthorChanged}>
            <option value=""></option>
            
    
            {userOptions()}
            
        </select>
        <br></br>
        <button type="submit">submit post</button>
    </form>
    </div>
  )
}
 
 
export default AddPostForm
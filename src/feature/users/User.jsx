import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { fetchUsers, selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'
 

function User() {
    const users=useSelector(selectAllUsers)
    const dispatch = useDispatch()
    console.log(users)
    

    
   function showUsers(){
    return(  users.map(user=>{
        return(<li><Link to={`/users/${user.id}`}>{user.name}</Link></li>)
        
    })
  
        
    )
   }

  return (
    <div>{showUsers()}</div>
  )
}

export default User
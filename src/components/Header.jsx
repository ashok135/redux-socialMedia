import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
         <div>Simple blog site</div>
         <nav>
            <ul>
                <li ><Link to="/"> HOME</Link></li>
                 <li ><Link to="post"> POST</Link></li>
                  <li ><Link to="users"> USER</Link></li>
                   
                
            </ul>
         </nav>

    </div>
   
  )
}

export default Header
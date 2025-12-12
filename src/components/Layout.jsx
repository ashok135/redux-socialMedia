import { Outlet } from "react-router-dom";


import React from 'react'
import Header from "./Header";

function Layout() {
  return (
   
  <>
  <Header/>
     <main>
    <Outlet/>
     </main>

  
  
  </>
  )
}

export default Layout
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store.jsx'
import {Provider} from "react-redux"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { fetchPosts } from './feature/posts/postsSlice.jsx'
import { fetchUsers } from './feature/users/usersSlice.jsx'
 
store.dispatch(fetchPosts())
store.dispatch(fetchUsers())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
            <Route path="/*" element={<App />} />
        </Routes>

      </BrowserRouter>
  
    </Provider>
  </StrictMode>,
)

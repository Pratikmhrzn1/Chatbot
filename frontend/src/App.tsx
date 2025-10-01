import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import {Routes, Route} from "react-router-dom"
import { useAuth } from './context/useAuth'
import NotFound from './pages/NotFound'
function App() {
  const auth = useAuth();
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        {auth?.isLoggedIn && auth?.user &&(<Route path='/chat' element={<Chat/>}/>)}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App

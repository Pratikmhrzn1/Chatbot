
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Logo from '../Shared/Logo'
import { useAuth } from '../context/useAuth'
import NavLink from '../Shared/NavLink'
const Header = () => {
  const auth = useAuth();
  return (
    <>
    <AppBar 
  position="static"
  sx={{
    background: "rgb(5, 14, 24)",
    borderRadius: "2px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  }}
>
  <Toolbar sx={{ display: "flex" }}>
    <Logo />
    <div>{auth.isLoggedIn?(
      <><NavLink bg ="#00fffc" to="/chat" text="Go to chat" textColor="Black"/>
    <NavLink bg ="#51538f" to="/" text="Logout" textColor="White" onClick={auth.logout}/></>)
    :
    (<><NavLink bg ="#00fffc" to="/login" text="Login" textColor="Black"/>
    <NavLink bg ="#51538f" to="/signup" text="Signup" textColor="White"/></>)}</div>
  </Toolbar>
</AppBar>
    </>
  )
}

export default Header
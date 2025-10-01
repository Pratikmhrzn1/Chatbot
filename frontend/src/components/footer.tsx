import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
        <div style={{width:"100%", padding:10, minHeight:"20vh", maxHeight:"30pvh", marginTop:50}}>
            <p style={{fontSize:"30px", textAlign:"center"}}>
                Made by <span><Link className="nav-link" to={"https://github.com/Pratikmhrzn1"}>Pratik Maharjan</Link></span>
            </p>
        </div>
    </footer>
  )
}

export default Footer
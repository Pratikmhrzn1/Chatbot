import { Box, useMediaQuery, useTheme} from "@mui/material"
import TypyingAnimation from "../components/typer/TypingAnim"
import Footer from "../components/footer"
const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box width={'100%'} height={'100%'}>
      <Box sx={{display:"flex", width:"100%", flexDirection:"column", alignItems:"center",mx:"auto", mt:1}}>
        <Box>
          <TypyingAnimation/>
        </Box>
        <Box sx={{width:"100%", display:"flex",flexDirection:{md:"row",xs:"column", sm:"row"}, gap:10, my:3}}>
          <img src="ai.png" alt="ai" style={{width:"300px", height:"250px", margin:"auto" }}/>
          <img src="openai.png" className="image-inverted rotate" alt="chat" style={{width:"200px", height:"200px", margin:"auto"}}/>
        </Box>
        <Box sx={{display:"flex", width:"100%", mx:'auto'}}>
          <img src="chat.png" alt="chat" style={{display:"flex",margin:"auto", width:isBelowMd? "80%":"60%", alignItems:"center",
            borderRadius:20, boxShadow:"-5px -5px 100px #64f3d5", marginTop:20}}/>
        </Box>
      </Box>
      <Footer/>
    </Box>
  )
}

export default Home
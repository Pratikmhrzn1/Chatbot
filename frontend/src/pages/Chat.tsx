import { Box, Avatar, Typography, Button, IconButton } from "@mui/material"
import { red } from "@mui/material/colors"
import { useAuth } from "../context/useAuth"
import ChatItem from "../components/chat/chatItem";
import { IoMdSend } from "react-icons/io"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/apiCommunicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
type Message = {
  role: "user" | "assistant";
  content: string;
};
const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    
    // Add user message to UI immediately
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]); 
    try {
      const chatData = await sendChatRequest(content);
      // Replace with all chats from server (includes user message + AI response)
      setChatMessages(chatData.chats);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Remove the user message if API call failed
      setChatMessages((prev) => prev.slice(0, -1));
    }
  }
  const handleDeleteChats = async () =>{
    try{
      toast.loading("Deleting chats...",{id:"deleteChats"});
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats deleted successfully!",{id:"deleteChats"});
    }catch(error){
      console.log(error);
      toast.error('Failed to delete chats.',{id:"deleteChats"});
    }
  }
  useLayoutEffect(() => {
    if(auth?.isLoggedIn && auth.user){
      toast.loading("Loading chats...",{id:"loadChats"});
      getUserChats().then((data)=>{
        setChatMessages([...data.chats]);
        toast.success("Chats loaded successfully!",{id:"loadChats"});
      }).catch(err =>{
        console.log(err);
        toast.error("Failed to load chats.",{id:"loadChats"}) 
    });  
    }
  },[auth]);
  useEffect(() => {
    if(!auth?.user){
      navigate("/login");
    }
  },[auth]);

  return (
    <>
      <Box sx={{ display: "flex", flex: 1, width: "100%", mt: 3, gap: 3, overflow: "hidden" }}>
        <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
          <Box sx={{
            display: "flex", width: "300px", height: "80vh",
            bgcolor: "rgb(17,29,39)", borderRadius: 4, flexDirection: "column", mx: 2
          }}>
            <Avatar sx={{ mx: "auto", my: 6, bgcolor: "white", color: "black", fontWeight: 600, padding: 4, fontSize: "40px" }}>
              {auth.user?.name[0]}{auth?.user?.name.split("")[1][0]}
            </Avatar>
            <Typography sx={{ mx: "auto", fontFamily: "work sans", fontSize: "25px" }}>Dear User</Typography>
            <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 1, p: 3 }}>
              You can ask various questions regarding knowledge, business, advice and so on.
              Please do not share personal information over here.
            </Typography>
            <Button onClick={handleDeleteChats} sx={{
              width: "200px", m: "auto", color: "white", fontWeight: "700",
              borderRadius: 3, mx: "auto", bgcolor: red[300],
              ":hover": { bgcolor: red.A400, }
            }}>Clear Conversation</Button>
          </Box>
        </Box>

        <Box sx={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
          <Typography
            sx={{ textAlign: "center", fontSize: "30px", color: "white", mb: 1 }}
          >
            Model GPT-3.5 Turbo
          </Typography>
          
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              borderRadius: 3,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                display: "none"
              },
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}>
            {chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
          </Box>

          <Box sx={{
            width: "98%",
            padding: "18px",
            borderRadius: 2,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            marginRight: "auto",
            marginTop: "18px"
          }}>
            <input
              ref={inputRef}
              type="text"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "10px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px"
              }}
            />
            <IconButton
              sx={{ ml: "auto", color: "white" }}
              onClick={handleSubmit}
            >
              <IoMdSend />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Chat
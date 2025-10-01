import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/useAuth';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractedCodeFromString(message: string) {
  if (message.includes("`")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (str.includes("=") || str.includes("[") || str.includes("]") || str.includes(";") || str.includes("#") || str.includes("//")
   || str.includes("function") || str.includes("const") || str.includes("let") || str.includes("var")){
    return true;
  }
  return false;
}

const ChatItem = ({ content, role }: { content: string, role: "user" | "assistant" }) => {
  const messageBlocks = extractedCodeFromString(content);
  const auth = useAuth();
  
  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", gap: 2, my: 1, maxWidth: "100%" }}>
      <Avatar sx={{ ml: 0, flexShrink: 0 }}>
        <img src='openai.png' alt='openai' width={"30px"} />
      </Avatar>
      <Box sx={{ overflow: "hidden", width: "100%" }}>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px", wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
            {content}
          </Typography>
        )}
        {messageBlocks && messageBlocks.length && messageBlocks.map((block, index) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter
              key={index}
              style={coldarkDark}
              language="javascript"
              wrapLongLines={true}
            >
              {block}
            </SyntaxHighlighter>
          ) : (
            <Typography 
              key={index} 
              sx={{ fontSize: "20px", wordWrap: "break-word", whiteSpace: "pre-wrap" }}
            >
              {block}
            </Typography>
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2, my: 0, maxWidth: "100%" }}>
      <Avatar sx={{ ml: 0, bgcolor: "black", color: "white", flexShrink: 0 }}>
        {auth.user?.name?.[0]}
        {auth.user?.name?.[1]}
      </Avatar>
      <Box sx={{ overflow: "hidden", width: "100%" }}>
        <Typography 
          fontSize={"20px"} 
          sx={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
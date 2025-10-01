import { Router } from "express";
import { verifyToken } from "../utils/tokenmanager.js";
import { chatCompletionValidator, Validate } from "../utils/validator.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controller.js";
//Protected API
const chatRoutes = Router();
chatRoutes.post("/new", Validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete-chats", verifyToken, deleteChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map
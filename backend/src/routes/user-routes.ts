import {Router} from "express" // Import the Router factory from Express
import {getAllUsers, userLogin, userSignup, checkAuthStatus, verifyUser, userLogout} from "../controllers/user-controller.js" // Import the controller handling the GET request
import {LoginValidator, Validate,signupValidator} from "../utils/validator.js"
// import user from "../models/user.js";
import { verifyToken } from "../utils/tokenmanager.js";
const userRoutes = Router(); // Create a new router instance to group user-related routes
userRoutes.get("/",getAllUsers); // Register GET / (e.g., /users) to invoke getAllUsers controller
userRoutes.post("/signup",Validate(signupValidator),userSignup);
userRoutes.post("/login",Validate(LoginValidator),userLogin);
userRoutes.get("/auth-status",verifyToken,checkAuthStatus);
userRoutes.get("/logout",verifyToken,userLogout);
export default userRoutes; // Export the configured router to be mounted in the app/
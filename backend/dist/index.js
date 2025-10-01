import app from "./app.js";
import { connectToDB } from "./db/connection.js";
//connection and listeners
const PORT = process.env.PORT || 5000;
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);
connectToDB().then(() => {
    app.listen(PORT, () => console.log("Server opened and connected to database"));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map
import { connect, disconnect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { MONGODB_URL } = process.env;
async function connectToDB() {
    try {
        if (!MONGODB_URL || MONGODB_URL.trim().length === 0) {
            throw new Error("MONGODB_URL is not set");
        }
        await connect(MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to connect to MongoDB");
    }
}
async function disconnectFromDB() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error('Failed to disconnect from MongoDB');
    }
}
export { connectToDB, disconnectFromDB };
//# sourceMappingURL=connection.js.map
import axios from "axios"
const API_BASE_URL = "http://localhost:5000/api/v1";
export const loginUser = async (email: string, password: string) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/user/login`, { email, password }, {
            withCredentials: true
        });
        if (res.status !== 200) {
            throw new Error('Unable to login');
        }
        return res.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};
export const checkAuthStatus = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/user/auth-status`,{
            withCredentials: true
        });
        if (res.status !== 200) {
            throw new Error("Unable to authenticate");
        }
        return res.data;
    } catch (error) {
        console.log("Auth status failed:", error);
        throw error;
    }
};

export const sendChatRequest = async (message: string) => {
    try {
        console.log("Sending chat request with message:", message);
        const res = await axios.post(`${API_BASE_URL}/chat/new`, { message }, {
            withCredentials: true
        });
        // console.log("Chat response:", res);
        // console.log("Response data:", res.data); // Add this line
        // console.log("Chats array:", res.data.chats); // Add this line
        
        if (res.status !== 200) {
            throw new Error("Unable to send chat");
        }
        return res.data;
    } catch (error) {
        console.log("Chat request failed:", error);
        throw error;
    }
};
export const getUserChats = async () => {
    try {
        // console.log("Sending chat request with message:",);
        const res = await axios.get(`${API_BASE_URL}/chat/all-chats`, {
            withCredentials: true
        });
        if (res.status !== 200) {
            throw new Error("Unable to get chat");
        }
        return res.data;
    } catch (error) {
        console.log("Chat request failed:", error);
        throw error;
    }
};
export const deleteUserChats = async () => {
    const res = await axios.delete(`${API_BASE_URL}/chat/delete-chats`);
    if(res.status !== 200){
        throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    return data;
}
export const logoutUser = async () => {
    const res = await axios.get(`${API_BASE_URL}/user/logout`, {
        withCredentials: true  // Add this!
    });
    if(res.status !== 200){
        throw new Error("Unable to logout");
    }
    const data = await res.data;
    return data;
}
export const signupUser = async (name: string, email: string, password: string) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/user/signup`,{name,email,password });
        if (res.status !== 200) {
            throw new Error('Unable to Signup');
        }
        const data =res.data;
        return data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};
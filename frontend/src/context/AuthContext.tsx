import { type ReactNode, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/apiCommunicator";
import { AuthContext, type UserAuth } from "./AuthContext";
type User = {
    name: string;
    email: string;
};

export const AuthProvider = ({children}:{children: ReactNode})=>{
    const[user,setUser]=useState<User| null>(null);
    const[isLoggedIn,setIsLoggedIn]= useState(false);
    useEffect(()=>{
        //fetch if the user's cookies are valid then skip login
        async function checkStatus(){
            try {
                const data =  await checkAuthStatus();
                if(data){
                    setUser({email:data.email, name:data.name});
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.log('AuthContext: Auth status failed:', error);
            }
        }
        checkStatus();
    },[]);
    const login = async(email:string, password:string)=>{
        try {
            const data = await loginUser(email,password);
            if(data){
                setUser({email:data.email, name: data.name, })
                setIsLoggedIn(true)
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Re-throw so the Login component can handle it
        }
    }
    const signup = async (name: string, email: string, password: string) => {
  const data = await signupUser(name, email, password);

  if (data) {
    // use the `name` from signup form, since backend doesn’t return it
    setUser({ email: data.email, name });
    setIsLoggedIn(true);
  }
};

    const logout= async()=>{
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = "/login";

    };
    const value: UserAuth ={
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
import { useContext } from "react";
import { AuthContext, type UserAuth } from "./AuthContext.ts";

export const useAuth = (): UserAuth => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};

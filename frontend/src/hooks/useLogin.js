import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setloading] = useState(false);
    const {setAuthUser} = useAuthContext();
    
    const login = async (username, password) => {
        const success = handleInputErrors(username, password);
        if(!success) return;
        setloading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({username, password})

            })
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            
        } catch(error) {
            toast.error(error.message);
        } finally {
            setloading(false);
        }
    }
    return {loading, login}
}

export default useLogin

function handleInputErrors(username, password) { //can make this function reusable - via hook?
    if(!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
   
    return true;
}
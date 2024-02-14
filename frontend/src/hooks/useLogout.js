import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {"Context-Type": "application/json"}
        }) //need to clear cookies from backend. just because we clear the cookie on the front end doesn't mean someone else can't (if they can somehow recreate that cookie) make requests to the backedn as this user. so just clearing cookies on the front end stops our user from making requests, but if somenoe else makes a request with that cookie (somehow) the backend will still accept it

        const data = await res.json();
        if(data.error) {
            throw new Error(data.error);
        }
        localStorage.removeItem("chat-user"); //clear local storage
        setAuthUser(null);

    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  }
  return {loading, logout};
}

export default useLogout
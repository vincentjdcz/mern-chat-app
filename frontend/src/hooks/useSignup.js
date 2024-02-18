import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const signup = async({fullName, username, password, confirmPassword, gender}) => {
    setLoading(true);
    const success = handleInputErrors({fullName, username, password, confirmPassword, gender});
    if(!success) {
        console.log("setting loading to false1");
        setLoading(false);
        return;
    } 
    try{
        const res = await fetch("/api/auth/signup", { //NOTE: in dev since we use proxy in vite.config.js we are removing the base of the URL full url would be something like http://localhost:5000/api/auth/signup
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({fullName, username, password, confirmPassword, gender})
        })
        const data = await res.json();
        if(data.error) {
            throw new Error(data.error);
        }
        
        localStorage.setItem("chat-user", JSON.stringify(data)); //save user in local storage
        
        setAuthUser(data); //set the auth user context value to our user

        console.log(data);
    } catch (error){
        toast.error(error.message);
        setLoading(false);
    } finally {
        setLoading(false);
    }
  };
  return {loading, signup}
};

export default useSignup

function handleInputErrors({fullName, username, password, confirmPassword, gender}) {
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        console.log("settingLoading to false: ");
        setLoading(false);
        console.log("Loading value: ", loading);
        return false;
    }

    if(password !== confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return false;
    }

    if(password.length < 6) {
        toast.error("Password must be at least 6 characters");
        setLoading(false);
        return false;
    }

    return true;
}
import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversation();

  useEffect(() => {
    const getMessages = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/messages/${selectedConversation._id}`) //fetch messages from backend
          const data = await res.json(); //parse the json
          if (data.error) throw new Error(data.error);
          setMessages(data); //set the state of messages to be the messages we fetched
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    if(selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]) //if the selected conversation changes we run this useEffect again (thus fetching the messages relevant to the selected conversation)

  return {messages, loading};
}

export default useGetMessages
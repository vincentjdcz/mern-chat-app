import { useAuthContext } from "../../context/AuthContext"
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start"; //determine whether we should style the message as from us or from other user
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic; //remember, selectedConversation is a user
  const bubbleBgColor = fromMe? 'bg-blue-500' : "";
  console.log("in message component"); //TEST
  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component"
                src={profilePic}
                />

            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div> {/* remember, message is one of the messages we iterated over during the .map in Messages.jsx. we passed it here having named it message. It's an object, with a property named message that actually has the message*/}
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTime}</div>
    </div>
  )
}

export default Message

/*
Note: check daisy ui docs for the styles applied here. Should be able to search "bubble" or "chat" to find these
*/
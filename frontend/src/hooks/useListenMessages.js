import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3"
const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages, setMessages} = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true; //add a property called shouldSHake to the newMessage object,
        const sound = new Audio(notificationSound); //create an audio object
        sound.play(); //play the audio of the audio object
        setMessages([...messages, newMessage]);

    })
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
}

export default useListenMessages

/*
Notes: socket?.off()

The socket.off function in Socket.IO is used to remove event listeners from a socket. It allows you to unsubscribe from specific events that you previously subscribed to using the socket.on function.

Here's how you can use socket.off:

javascript
Copy code
// Define the event listener
const myEventListener = (data) => {
    console.log('Received data:', data);
};

// Subscribe to the event
socket.on('myEvent', myEventListener);

// Later, when you want to unsubscribe from the event
socket.off('myEvent', myEventListener);
In this example:

First, an event listener function (myEventListener) is defined.
Then, the socket.on function is used to subscribe to the 'myEvent' event, and myEventListener is passed as the callback function.
Finally, socket.off is used to unsubscribe from the 'myEvent' event, passing the same event name and event listener function that were used to subscribe to it.
After calling socket.off, the myEventListener function will no longer be invoked when the 'myEvent' event is emitted on the socket.
*/
import Message from "./Message"
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";
const Messages = () => {
  const {messages, loading} = useGetMessages();
  const lastMessageRef = useRef(); //In React, when you set the ref of multiple elements to the same lastMessageRef, the lastMessageRef.current property will always point to the last element whose ref was set to lastMessageRef.
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
    }, 100); //delay the scrollIntoView because sometimes because of timing it doesn't end up scrolling into view
  }, [messages])
  return (
    <div className="px-4 flex-1 overflow-auto">
        
        {!loading && messages.length > 0 && messages.map(
          (message) => (
            <div key={message._id} 
              ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))
        }

        {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx}  />)} {/* see notes */}

        {!loading && messages.length === 0 && (
          <p className="text-center text-neutral-content">Send a message to start the conversation</p>
        )}
    
    </div>
  )
}

export default Messages

/*
STARTER CODE:
import Message from "./Message"

const Messages = () => {
  return (
    <div className="px-4 flex-1 overflow-auto">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
    </div>
  )
}

export default Messages
*/


/*

  Note: [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} explanation:

  {loading && ...}: This is a conditional rendering statement using the logical AND (&&) operator. It means "if loading is truthy, then proceed with the following code".

[...Array(3)]: This part creates an array with three undefined elements. Array(3) creates an array with three empty slots, and [...Array(3)] spreads those slots into an array with three undefined elements.

.map((_, idx) => <MessageSkeleton key={idx} />): This part maps over each element in the array generated in step 2. The _ is a convention to represent each element in the array (in this case, it's not used because the array elements are undefined), and idx is the index of each element. For each index, it renders a MessageSkeleton component with a unique key prop assigned to it.

Putting it all together:

If loading is true, the && operator continues to the next part.
An array with three elements is created.
Each element is mapped to a MessageSkeleton component, resulting in three MessageSkeleton components being rendered.
This code is commonly used in React to conditionally render components, in this case, a loading skeleton, while waiting for data to load. The MessageSkeleton components are placeholders that visually represent the expected content while the actual content is loading.

*/
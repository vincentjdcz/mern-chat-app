import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]); //conversations will be the list of all users in the database

  useEffect(() => {
    const getConversations = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/users");
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setConversations(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    getConversations();
  }, []);

  return {loading, conversations};
}

export default useGetConversations

/* Note: Defining a function then calling it in useEffect

The pattern of defining a separate function inside useEffect() and then calling it is a common practice in React development. While it may seem redundant at first glance, there are several reasons why this pattern is beneficial:

Readability and Maintainability: By defining a named function like getConversations, you provide a clear and descriptive name for the logic being executed inside useEffect(). This can make your code easier to understand for other developers who may be reading or working with it later.

Code Organization: Separating the logic into a separate function helps to organize your code and keep useEffect() focused on its primary purpose: side effects. This separation of concerns makes your codebase more modular and easier to maintain.

Reusability: Defining the logic as a separate function allows you to reuse it in other parts of your component or even in other components if needed. This can be especially useful if you have similar side effects in different parts of your application.

Testing: Separating the logic into a separate function makes it easier to write unit tests for that logic independently of the component. This can improve the overall testability and reliability of your code.

While it's possible to directly include the logic inside useEffect() without defining a separate function, doing so can lead to longer and less readable useEffect() callbacks, especially if the logic is complex or involves multiple steps. By following the pattern of defining a separate function, you can improve the clarity, maintainability, and reusability of your code.
*/
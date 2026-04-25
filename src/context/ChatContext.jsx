import { createContext, useState } from "react";

const ChatContext = createContext();

export const ContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const deleteChat = (id) => {
    setChats(chats.filter((chat) => chat.id !== id));
  };

  const toggleEdit = (id, newName) => {
    setChats(
      chats.map((chat) => {
        if (chat.id === id) {
          return {
            ...chat,
            text: newName || chat.text,
            isEditing: !chat.isEditing,
          };
        }
        return chat;
      }),
    );
  };

  const handleNameChange = (id, value) => {
    setChats(
      chats.map((chat) => (chat.id === id ? { ...chat, text: value } : chat)),
    );
  };

  const handlesend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      isEditing: false,
    };

    setChats((prevChats) => [...prevChats, newMessage]);
    setInput("");
  };

  return (
    <ChatContext.Provider
      value={{ chats, setChats, input, setInput, handlesend, deleteChat, toggleEdit, handleNameChange, deleteId, setDeleteId }}
    >
      {children}
    </ChatContext.Provider>
  );  
};

export default ChatContext;

import { createContext, useState } from "react";

const ChatContext = createContext();

export const ContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `New Chat ${chats.length + 1}`,
      isEditing: false,
      messages: [],
    };

    setChats((prevChats) => [newChat, ...prevChats]);
    setActiveChatId(newChat.id);
    setInput("");
  };

  const activeChat = chats.find((chat) => chat.id === activeChatId) || null;

  const deleteChat = (id) => {
    setChats((prevChats) => {
      const updatedChats = prevChats.filter((chat) => chat.id !== id);

      if (activeChatId === id) {
        setActiveChatId(updatedChats[0]?.id ?? null);
      }

      return updatedChats;
    });
  };

  const toggleEdit = (id) => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === id) {
          return {
            ...chat,
            isEditing: !chat.isEditing,
            title: chat.title.trim() || "Untitled Chat",
          };
        }

        return chat;
      }),
    );
  };

  const handleNameChange = (id, value) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === id ? { ...chat, title: value } : chat)),
    );
  };

  const updateMessageText = (messageId, value) => {
    if (!activeChatId) return;

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: chat.messages.map((message) =>
                message.id === messageId ? { ...message, text: value } : message,
              ),
            }
          : chat,
      ),
    );
  };

  const toggleMessageEdit = (messageId) => {
    if (!activeChatId) return;

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: chat.messages.map((message) =>
                message.id === messageId
                  ? {
                      ...message,
                      isEditing: !message.isEditing,
                      text: message.text.trim() || "Empty message",
                    }
                  : message,
              ),
            }
          : chat,
      ),
    );
  };

  const deleteMessage = (messageId) => {
    if (!activeChatId) return;

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: chat.messages.filter((message) => message.id !== messageId),
            }
          : chat,
      ),
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

    setChats((prevChats) => {
      if (!activeChatId) {
        const newChat = {
          id: Date.now() + 1,
          title: input.slice(0, 30),
          isEditing: false,
          messages: [newMessage],
        };

        setActiveChatId(newChat.id);
        return [newChat, ...prevChats];
      }

      return prevChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              title: chat.messages.length === 0 ? input.slice(0, 30) : chat.title,
              messages: [...chat.messages, newMessage],
            }
          : chat,
      );
    });

    setInput("");
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChatId,
        setActiveChatId,
        activeChat,
        input,
        setInput,
        handlesend,
        createNewChat,
        updateMessageText,
        toggleMessageEdit,
        deleteMessage,
        deleteChat,
        toggleEdit,
        handleNameChange,
        deleteId,
        setDeleteId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;

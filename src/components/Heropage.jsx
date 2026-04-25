import React, { useContext } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FiPaperclip } from "react-icons/fi";
import { HiOutlineMicrophone } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import ChatContext from "../context/ChatContext";
import { FaUser } from "react-icons/fa";
import { MdCheck, MdDelete, MdModeEdit } from "react-icons/md";

const Heropage = () => {
  const features = [
    {
      title: "Code Help",
      description:
        "Debug and write better code with ZingAI's coding assistant.",
    },
    {
      title: "Explanation",
      description: "Understand complex topics.",
    },
    {
      title: "Creative Writing",
      description: "Generate content and ideas.",
    },
    {
      title: "Problem solving",
      description: "Find solutions to challenges.",
    },
  ];

  const {input,setInput,handlesend,activeChat,updateMessageText,toggleMessageEdit,deleteMessage,
  } = useContext(ChatContext);

  const messages = activeChat?.messages || [];
  const showHero = messages.length === 0;

  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col">
      {showHero ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-md bg-green-500">
            <AiOutlineThunderbolt className="text-3xl font-bold text-white" />
          </div>
          <p className="mt-3 text-3xl font-bold text-green-500 sm:text-4xl md:text-5xl">
            Zing<span className="text-blue-500">AI</span>
          </p>
          <h1 className="mt-4 font-semibold text-gray-400">
            Ask me anything. I am here to help you.
          </h1>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg bg-gray-100 p-4 text-center"
              >
                <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex w-full max-w-xl items-start gap-3 rounded-lg bg-gray-200 px-4 py-2 text-gray-800">
                  <FaUser className="h-5 w-5 rounded bg-green-100 p-1" />

                  <div className="flex flex-1 flex-col">
                    <p className="text-xs text-gray-500">
                      {message.sender === "user" ? "You" : "ZingAI"}
                    </p>
                    {message.isEditing ? (
                      <input
                        value={message.text}
                        autoFocus
                        onChange={(e) => updateMessageText(message.id, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") toggleMessageEdit(message.id);
                        }}
                        className="rounded border bg-white px-2 py-1 text-sm outline-none"
                      />
                    ) : (
                      <p className="text-sm break-words">{message.text}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-gray-500">
                    <button
                      onClick={() => toggleMessageEdit(message.id)}
                      className="rounded p-1 hover:bg-gray-300"
                    >
                      {message.isEditing ? (
                        <MdCheck className="text-green-600" />
                      ) : (
                        <MdModeEdit />
                      )}
                    </button>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="rounded p-1 hover:bg-red-100 hover:text-red-500"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full border-t border-gray-300 px-3 pb-4 sm:px-6">
        <div className="max-w-3xl mx-auto py-4">
          <div className="bg-gray-100 border border-gray-300 rounded-2xl p-3 shadow-sm focus-within:ring-2 focus-within:ring-green-400 transition">
            <div className="flex items-start gap-2">
              <FiPaperclip className="text-gray-500 mt-2 cursor-pointer" />

              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message ZingAI..."
                className="flex-1 bg-transparent outline-none resize-none text-sm sm:text-base px-1"
              />

              <HiOutlineMicrophone className="text-gray-500 mt-2 cursor-pointer" />

              <button
                className="bg-gray-300 hover:bg-green-500 hover:text-white transition p-2 rounded-lg"
                onClick={handlesend}
              >
                <IoMdSend size={18} />
              </button>
            </div>

            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <p>Press Enter to send, Shift + Enter for new line</p>
              <p>{input.length} / 4000</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-2">
            AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Heropage;

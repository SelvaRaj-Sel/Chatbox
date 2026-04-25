import React, { useContext, useState } from "react";
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

  const {
    input,
    setInput,
    handlesend,
    chats,
    setChats,
    deleteChat,
    toggleEdit,
    handleNameChange,
    deleteId,
    setDeleteId,
  } = useContext(ChatContext);

  return (
    <section className="flex flex-col justify-between min-h-min gap-9">
      {chats ? (chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex ${
              chat.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-xs px-4 py-2 rounded-lg flex items-start gap-3 bg-gray-200 text-gray-800">
              <FaUser className="bg-green-100 h-5 w-5 p-1 rounded" />

              <div className="flex flex-col flex-1">
                <p className="text-xs text-gray-500">
                  {chat.sender === "user" ? "You" : "ZingAI"}
                </p>

                {chat.isEditing ? (
                  <input
                    value={chat.text}
                    autoFocus
                    onChange={(e) => handleNameChange(chat.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") toggleEdit(chat.id);
                    }}
                    className="bg-white border px-2 py-1 rounded outline-none text-sm"
                  />
                ) : (
                  <p className="text-sm">{chat.text}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1 text-gray-500">
                <button onClick={() => toggleEdit(chat.id)}>
                  {chat.isEditing ? (
                    <MdCheck className="text-green-500" />
                  ) : (
                    <MdModeEdit />
                  )}
                </button>

                <button
                  onClick={() => setDeleteId(chat.id)}
                  className="hover:text-red-500"
                >
                  <MdDelete />
                </button>
                {deleteId && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 border border-gray-600 p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-all">
                      <h3 className="text-white text-lg font-bold mb-2">
                        Delete Chat?
                      </h3>
                      <p className="text-gray-400 text-sm mb-6">
                        This action cannot be undone. Are you sure you want to
                        delete this conversation?
                      </p>

                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setDeleteId(null)}
                          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => {
                            deleteChat(deleteId);
                            setDeleteId(null);
                          }}
                          className="px-4 py-2 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
        ) : (
      <div className="flex flex-col items-center justify-center text-center px-4">
        {/* logo */}
        <div className="flex items-center justify-center h-12 w-12 bg-green-500 rounded-md mt-6">
          <AiOutlineThunderbolt className="text-white text-3xl font-bold" />
        </div>
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 text-green-500">
          Zing<span className="text-blue-500">AI</span>
        </p>
        <h1 className="font-semibold mt-4 text-gray-400">
          Ask me anything. I am here to help you.
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg"
            >
              <h3 className="font-bold mt-4 text-lg">{feature.title}</h3>
              <p className="text-gray-500 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>)}
      {/* chat interface */}
      <div className="w-full px-3 sm:px-6 pb-4 border-t border-gray-300">
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

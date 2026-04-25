import React, { useContext, useState } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { CiChat1 } from "react-icons/ci";
import { FaCog, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosClose, IoIosHelpCircle } from "react-icons/io";
import { MdCheck, MdDelete, MdModeEdit } from "react-icons/md";
import ChatContext from "../context/ChatContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {chats,activeChatId,setActiveChatId,createNewChat,deleteChat,toggleEdit,handleNameChange,deleteId,setDeleteId,} = useContext(ChatContext);


  return (
    <>
      <section
        className={`fixed top-0 left-0 z-50 min-h-screen w-72 bg-gray-300/30 text-white p-4 flex flex-col border-r border-gray-400 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-around border-b border-gray-400 pb-4">
          <div className="flex justify-between ">
            <p className="text-green-500 font-bold text-2xl">
              Zing<span className="text-blue-500">AI</span>
            </p>
            <button onClick={() => setIsOpen(false)}>
              <IoIosClose className="font-bold text-3xl text-black" />
            </button>
          </div>
          <div className="pt-4">
            <button
              onClick={createNewChat}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded w-full flex items-center px-4 gap-2"
            >
              <p>+</p>
              <p>New Chat</p>
            </button>
          </div>
        </div>

        {/* chat history */}

        <section className="w-full px-2 sm:px-4">
          <div className="max-w-md mx-auto">
            {chats.map((chat) => (
              <section key={chat.id} className="w-full">
                <div
                  className={`text-white font-bold min-h-[3rem] h-auto py-2 rounded w-full flex justify-between items-center px-3 gap-3 mt-4 transition-all ${
                    activeChatId === chat.id
                      ? "bg-gray-700"
                      : "bg-gray-600/80 hover:bg-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <CiChat1 className="text-xl flex-shrink-0" />
                    {chat.isEditing ? (
                      <input
                        className="bg-gray-800 text-white px-2 py-0.5 rounded outline-none border border-blue-500 w-full font-normal text-sm sm:text-base"
                        value={chat.text}
                        onChange={(e) =>
                          handleNameChange(chat.id, e.target.value)
                        }
                        autoFocus
                        onKeyDown={(e) =>
                          e.key === "Enter" && toggleEdit(chat.id)
                        }
                      />
                    ) : (
                      <p
                        className="truncate text-sm sm:text-base font-medium cursor-pointer"
                        onClick={() => setActiveChatId(chat.id)}
                      >
                        {chat.title}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-1 text-gray-400 flex-shrink-0">
                    <button
                      onClick={() => toggleEdit(chat.id)}
                      className="hover:text-white transition-colors"
                    >
                      {chat.isEditing ? (
                        <MdCheck className="text-green-400" />
                      ) : (
                        <MdModeEdit />
                      )}
                    </button>

                    <div></div>
                    <button
                      onClick={() => setDeleteId(chat.id)}
                      className="hover:text-red-400 transition-colors"
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
                            This action cannot be undone. Are you sure you want
                            to delete this conversation?
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
              </section>
            ))}
          </div>
        </section>

        {/* user profile */}
        <section className="relative mt-auto mb-4 border-t border-gray-400 pt-4">
          {isMenuOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 z-50 text-black cursor-pointer bg-white rounded-lg shadow-xl p-3 flex flex-col gap-2 backdrop-blur-lg">
              <div className="flex items-center gap-3 border-b border-gray-400 pb-2 hover:text-green-700 transition-colors">
                <FaUser /> My Account
              </div>
              <div className="flex items-center gap-3 border-b border-gray-400 py-2 hover:text-green-900 transition-colors text-green-500">
                <AiOutlineThunderbolt /> Upgrade Plan
              </div>
              <div className="flex items-center gap-3 border-b border-gray-400 py-2 hover:text-green-700 transition-colors">
                <FaCog /> Settings
              </div>
              <div className="flex items-center gap-3 border-b border-gray-400 py-2 hover:text-green-700 transition-colors">
                <IoIosHelpCircle /> Help
              </div>
              <div className="flex items-center gap-3 pt-2 text-red-500 hover:text-red-700 transition-colors">
                <FiLogOut /> Logout
              </div>
            </div>
          )}

          <div className="flex items-center">
            <div className="rounded-full bg-green-500 w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold">
              <p className="text-black">R</p>
            </div>
            <div className="flex flex-col pl-3 flex-1 min-w-0">
              <p className="text-black font-bold truncate">Ragav</p>
              <p className="text-gray-800/70 text-xs truncate">
                ragav123@gmail.com
              </p>
            </div>
            <BsThreeDots
              className="text-black cursor-pointer hover:bg-gray-400/20 rounded p-1 text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </section>
      </section>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;

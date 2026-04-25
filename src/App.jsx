import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Heropage from "./components/Heropage";
import { ContextProvider } from "./context/ChatContext";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ContextProvider>
      <div className="relative min-h-screen bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div
          className={`min-h-screen transition-[margin] duration-300 ${
            isSidebarOpen ? "ml-72" : "ml-0"
          }`}
        >
          <Navbar setIsOpen={setIsSidebarOpen} />
          <Heropage />
        </div>
      </div>
    </ContextProvider>
  );
}

export default App;

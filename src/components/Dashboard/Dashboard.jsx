import React, { useState, useEffect } from "react";
import HistoricalData from "../HistoricalData/HistoricalData";
import TokenTransfer from "../TokenTransfer/TokenTransfer";
import WalletDetails from "../WalletDetails/WalletDetails";
import TokenBalances from "../TokenBalances/TokenBalances";
import { FiMenu, FiX } from "react-icons/fi";

export default function Dashboard() {
  const [mainTab, setMainTab] = useState("Historical Data");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Show a warning about potential data loss
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      // Hide components and then close sidebar
      setIsComponentVisible(false);
      setTimeout(() => {
        setIsSidebarOpen(false);
      }, 300); // Match the duration of the closing animation
    } else {
      // Open sidebar and then show components
      setIsSidebarOpen(true);
      setTimeout(() => {
        setIsComponentVisible(true);
      }, 300); // Match the duration of the opening animation
    }
  };

  return (
    <div className="h-[86.2vh] flex">
      <div
        className={`h-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-[50%]" : "w-0"
        } bg-[#2a2f37] overflow-hidden flex flex-col relative`}
      >
        <div
          className={`flex-1 transition-opacity duration-300 ${
            isComponentVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-[50%]">
            <WalletDetails />
          </div>
          <div className="w-full h-[50%] flex justify-center items-center relative">
            <TokenBalances />
          </div>
        </div>
        <div
          className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-full cursor-pointer"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
      </div>
      <div
        className={`w-full h-full transition-all duration-300 ease-in-out relative`}
      >
        <div className="h-12 bg-gray-800 text-white flex items-center relative">
  <div
    className={`w-1/2 text-center py-3 cursor-pointer relative z-10 transition-all duration-300 ease-in-out ${
      mainTab === "Historical Data" ? "text-white" : "text-gray-400 hover:text-white"
    }`}
    onClick={() => setMainTab("Historical Data")}
  >
    Historical Data
  </div>
  <div
    className={`w-1/2 text-center py-3 cursor-pointer relative z-10 transition-all duration-300 ease-in-out ${
      mainTab === "Token Transfer" ? "text-white" : "text-gray-400 hover:text-white"
    }`}
    onClick={() => setMainTab("Token Transfer")}
  >
    Token Transfer
  </div>

  {/* Animated Background */}
  <div
    className={`absolute top-0 left-0 w-1/2 h-full bg-gray-700 rounded-3xl transition-all duration-500 ease-in-out ${
      mainTab === "Token Transfer" ? "transform translate-x-full" : ""
    }`}
  ></div>
</div>

        <div className="w-full h-full flex justify-center bg-[#1a1b1e]/60 relative">
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            {!isSidebarOpen && (
              <div
                className="absolute top-4 left-4 p-2 bg-gray-800 text-white rounded-full cursor-pointer z-10"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </div>
            )}
            {mainTab === "Historical Data" ? (
              <>
                <HistoricalData isSidebarOpen={isSidebarOpen} />
              </>
            ) : (
              <TokenTransfer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

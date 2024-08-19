import React, { useState, useEffect } from "react";
import HistoricalData from "../HistoricalData/HistoricalData";
import TokenTransfer from "../TokenTransfer/TokenTransfer";
import WalletDetails from "../WalletDetails/WalletDetails";
import TokenBalances from "../TokenBalances/TokenBalances";

export default function Dashboard() {
  const [mainTab, setMainTab] = useState("Historical Data");

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

  return (
    <div className="h-[86.2vh] flex">
      <div className="h-full w-[35%] flex flex-col bg-[#2a2f37]">
        <div className="w-full h-[50%]">
          <WalletDetails />
        </div>
        <div className="w-full h-[50%] flex items-center">
          <TokenBalances />
        </div>
      </div>
      <div className="w-[75%] h-full">
        <div className="h-12 bg-gray-800 text-white flex items-center border-b border-gray-300">
          <div
            className={`w-1/2 text-center py-3 cursor-pointer ${
              mainTab === "Historical Data"
                ? "bg-gray-700"
                : "hover:bg-gray-600"
            }`}
            onClick={() => setMainTab("Historical Data")}
          >
            Historical Data
          </div>
          <div
            className={`w-1/2 text-center py-3 cursor-pointer ${
              mainTab === "Token Transfer" ? "bg-gray-700" : "hover:bg-gray-600"
            }`}
            onClick={() => setMainTab("Token Transfer")}
          >
            Token Transfer
          </div>
        </div>
        <div className="w-full h-full flex justify-center bg-[#1a1b1e]/60">
          {mainTab === "Historical Data" ? (
            <HistoricalData />
          ) : (
            <TokenTransfer />
          )}
        </div>
      </div>
    </div>
  );
}

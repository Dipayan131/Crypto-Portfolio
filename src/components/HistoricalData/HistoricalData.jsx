import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const HistoricalData = ({ isSidebarOpen }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [historicalData, setHistoricalData] = useState([]);
  const [tokenSymbol, setTokenSymbol] = useState('BTC');
  const [width, setWidth] = useState(isSidebarOpen ? 700 : 1000); // Initial width

  const tokenOptions = [
    { label: 'Bitcoin', symbol: 'BTC' },
    { label: 'Ethereum', symbol: 'ETH' },
    { label: 'Litecoin', symbol: 'LTC' },
    { label: 'Ripple', symbol: 'XRP' },
    { label: 'Cardano', symbol: 'ADA' },
    { label: 'Polygon', symbol: 'MATIC' },
    { label: 'Chainlink', symbol: 'LINK' },
    { label: 'Uniswap', symbol: 'UNI' },
    { label: 'Aave', symbol: 'AAVE' },
    { label: 'Solana', symbol: 'SOL' },
  ];

  useEffect(() => {
    setWidth(isSidebarOpen ? 700 : 1000);
  }, [isSidebarOpen]);

  const fetchHistoricalData = async () => {
    const baseCurrency = 'USD'; // Base currency for comparison, usually 'USD'
    const apiKey = '69c12aa2d66a0069427aa5c2f2c976ccf492578d50bb77e6512e6c15487c70e3'; // Replace with your actual API key
    const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
    const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

    const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${tokenSymbol}&tsym=${baseCurrency}&toTs=${endTimestamp}&limit=2000&api_key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data.Data.Data
        .filter((entry) => {
          const entryDate = new Date(entry.time * 1000);
          return entryDate >= startDate && entryDate <= endDate;
        })
        .map((entry) => ({
          date: new Date(entry.time * 1000).toISOString().split('T')[0],
          balance: entry.close, // Assuming you want the closing price
        }));
      setHistoricalData(data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  return (
    <div className="historical-data p-6 bg-gray-800 rounded-2xl shadow-lg h-[84%] w-[80%] flex flex-col items-center justify-center">
      <div className="date-pickers flex items-center justify-between mb-6 w-full">
        <DatePicker 
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
          className="p-3 border border-gray-300 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          placeholderText="Start Date"
        />
        <DatePicker 
          selected={endDate} 
          onChange={(date) => setEndDate(date)} 
          className="p-3 border border-gray-300 rounded-lg bg-gray-700 text-white placeholder-gray-400"
          placeholderText="End Date"
        />
        <select
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg bg-gray-700 text-white mx-2"
        >
          {tokenOptions.map(({ label, symbol }) => (
            <option key={symbol} value={symbol}>
              {`${label} (${symbol})`}
            </option>
          ))}
        </select>
        <button 
          onClick={fetchHistoricalData} 
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Fetch Historical Data
        </button>
      </div>
      <div className="flex justify-center w-full">
        <LineChart width={width} height={400} data={historicalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default HistoricalData;

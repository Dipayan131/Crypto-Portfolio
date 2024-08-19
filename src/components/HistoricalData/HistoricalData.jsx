import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const HistoricalData = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [historicalData, setHistoricalData] = useState([]);

  const fetchHistoricalData = async () => {
    const tokenSymbol = 'BTC'; // Replace with the token symbol, e.g., 'BTC', 'ETH', 'DAI'
    const baseCurrency = 'USD'; // Base currency for comparison, usually 'USD'
    const apiKey = '69c12aa2d66a0069427aa5c2f2c976ccf492578d50bb77e6512e6c15487c70e3'; // Replace with your actual API key
    const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
    const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

    const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${tokenSymbol}&tsym=${baseCurrency}&toTs=${endTimestamp}&limit=2000&api_key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data.Data.Data
        .filter(entry => {
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
    <div className="historical-data p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="date-pickers flex justify-between mb-4">
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="p-2 border rounded" />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="p-2 border rounded" />
        <button onClick={fetchHistoricalData} className="p-2 bg-blue-500 text-white rounded">Fetch Historical Data</button>
      </div>
      <LineChart width={600} height={300} data={historicalData} className="mx-auto">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="balance" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default HistoricalData;

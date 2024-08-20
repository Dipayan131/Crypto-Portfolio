import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TokenBalances = () => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'ethereum,polygon,maker,uniswap,aave',
            vs_currencies: 'usd'
          }
        });
        setPrices(response.data);
      } catch (err) {
        setError('Failed to fetch prices');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) return <p className='bg-gray-800 p-4 rounded-lg text-red-300 shadow-md border border-white'>Loading...</p>;
  if (error) return <p className='bg-gray-800 p-4 rounded-lg text-red-400 shadow-md border border-white'>{error}</p>;

  return (
    <div className="p-6 bg-[#252323] max-w-4xl mx-auto rounded-lg shadow-lg border border-white">
      <h1 className="text-2xl font-bold mb-6 text-blue-300">Current Market Crypto Prices</h1>
      <ul className="list-disc pl-5 space-y-2">
        {Object.entries(prices).map(([key, value]) => (
          <li key={key} className="text-white text-lg">
            <span className="font-semibold capitalize">{key}:</span> ${value.usd.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenBalances;
import { useState, useEffect } from 'react';
import { getExchangeRates } from '../Services/Exchanges/Taux_Conversion';

const ExchangeRateWidget = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getExchangeRates(selectedCurrency);
        setData(result);
      } catch (error) {
        setError('Failed to fetch exchange rates');
      }
    };
    fetchData();
  }, [selectedCurrency]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <div className="absolute top-2 left-2 lg:w-1/4 h-1/2 bg-white shadow-md rounded-lg">
      <div className="p-4 h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Exchange Rates</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="currency" className="block text-gray-700 text-sm font-medium mb-2">
            Select Currency:
          </label>
          <select
            id="currency"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="JPY">JPY</option>
            <option value="CNH">CNH</option>
            <option value="CHF">CHF</option>
            <option value="SEK">SEK</option>
            <option value="NZD">NZD</option>
          </select>
        </div>

        <div className="overflow-y-auto flex-1">
          {data ? (
            <>
              <p className="mb-2">Base Currency: <strong>{data.base_code}</strong></p>
              <p className="mb-2">Updated last time: <strong>{formatDate(data.time_last_update_utc)}</strong></p>
              <table className="w-full border border-gray-300">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="border px-4 py-2">Currency</th>
                    <th className="border px-4 py-2">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(data.conversion_rates).map(([currency, rate]) => (
                    <tr key={currency}>
                      <td className="border px-4 py-2">{currency}</td>
                      <td className="border px-4 py-2">{rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateWidget;

import { useEffect, useState } from "react";
import axios from "axios";

const IntradayStockWidget = () => {
    const [intradayData, setIntradayData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIntradayData = async () => {
            try {
                const response = await axios.get('https://api.marketstack.com/v1/intraday?access_key=bdd7076524ef68d41e4ae90ef3075644&symbols=AAPL');
                setIntradayData(response.data);
            } catch (error) {
                setError('Failed to fetch intraday stock data. Please try again later.');
            }
        };

        fetchIntradayData();
    }, []);

    return (
        <div className="absolute top-2 left-2 lg:w-1/4 h-1/2 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 h-full flex flex-col bg-white bg-opacity-80 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Intraday Stock Data - AAPL</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                
                <div className="flex-1 overflow-y-auto">
                    {intradayData ? (
                        intradayData.data.map((stock, index) => (
                            <div key={index} className="mb-4 border-b pb-2">
                                <p className="mb-2"><strong>Symbol: </strong>{stock.symbol}</p>
                                <p className="mb-2"><strong>Date: </strong>{new Date(stock.date).toLocaleString()}</p>
                                <p className="mb-2"><strong>Open: </strong>{stock.open}</p>
                                <p className="mb-2"><strong>High: </strong>{stock.high}</p>
                                <p className="mb-2"><strong>Low: </strong>{stock.low}</p>
                                <p className="mb-2"><strong>Close: </strong>{stock.close}</p>
                                <p className="mb-2"><strong>Volume: </strong>{stock.volume}</p>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IntradayStockWidget;

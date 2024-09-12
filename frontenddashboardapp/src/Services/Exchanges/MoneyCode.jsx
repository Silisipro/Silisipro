import { useEffect, useState } from "react";
import axios from "axios";

const CurrencyWidget = () => {
    const [currencies, setCurrencies] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                const response = await axios.get('https://api.marketstack.com/v1/currencies?access_key=bdd7076524ef68d41e4ae90ef3075644');
                setCurrencies(response.data);
            } catch (error) {
                setError('Failed to fetch currency data. Please try again later.');
            }
        };

        fetchCurrencyData();
    }, []);

    return (
        <div className="absolute top-2 left-2 lg:w-1/4 h-1/2 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 h-full flex flex-col bg-white bg-opacity-80 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Currency Information</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                
                <div className="flex-1 overflow-y-auto">
                    {currencies ? (
                        currencies.data.map(currency => (
                            <div key={currency.code} className="mb-4 border-b pb-2">
                                <p className="mb-2"><strong>Name: </strong>{currency.name}</p>
                                <p className="mb-2"><strong>Code: </strong>{currency.code}</p>
                                <p className="mb-2"><strong>Symbol: </strong>{currency.symbol}</p>
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

export default CurrencyWidget;

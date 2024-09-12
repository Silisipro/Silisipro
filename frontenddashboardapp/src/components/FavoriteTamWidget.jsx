import { useEffect, useState } from "react";
import { AboutMyFavoriteTeam } from "../Services/FavoriteTeam/FavoriteTeam";

const FavoriteTeamWidget = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [team, setTeam] = useState('Chelsea');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await AboutMyFavoriteTeam(team);
                if (result && result.teams) {
                    setData(result);
                    setError(null); 
                } else {
                    setError('No teams found for the specified name.');
                }
            } catch (error) {
                setError('Failed to fetch data. Please try again later.');
            }
        };
        fetchData();
    }, [team]);

    const handleFavoriteTeamChange = (e) => {
        setTeam(e.target.value);
        setError(null); 
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); 
        setTeam(team); 
    };

    return (
        <div
            className="absolute top-2 left-2 lg:w-1/4 h-1/2 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 h-full flex flex-col bg-white bg-opacity-80">
                <h2 className="text-xl font-semibold mb-4">Favorite Team</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="team" className="block text-gray-700 text-sm font-medium mb-2">
                            Enter your favorite football team or club:
                        </label>
                        <input
                            type="text"
                            id="team"
                            value={team}
                            onChange={handleFavoriteTeamChange}
                            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </form>
                </div>
                <div className="overflow-y-auto flex-1">
                    {data ? (
                        <>
                            {data.teams && data.teams.length > 0 ? (
                                <>
                                    <p className="mb-2">
                                        Team or Club: <strong>{data.teams[0].strTeamAlternate}</strong>
                                    </p>
                                    <p className="mb-2">Creation date: <strong>{data.teams[0].intFormedYear}</strong></p>
                                    <p className="mb-2">Stadium: <strong>{data.teams[0].strStadium}</strong></p>
                                    <p className="mb-2">Description: <strong>{data.teams[0].strDescriptionEN}</strong></p>
                                </>
                            ) : (
                                <p>No teams found.</p>
                            )}
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavoriteTeamWidget;

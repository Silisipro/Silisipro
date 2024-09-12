import { useEffect, useState } from "react";
import axios from "axios";

const SpaceXLaunches = () => {
    const [launches, setLaunches] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLaunches = async () => {
            try {
                const response = await axios.get('https://api.spacexdata.com/v3/launches?limit=15&offset=15');
                setLaunches(response.data);
                setError(null);
            } catch (error) {
                setError('Failed to fetch SpaceX launch data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchLaunches();
    }, []);

    return (
        <div className="absolute top-2 left-2 lg:w-1/4 h-1/2 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 h-full flex flex-col bg-white bg-opacity-80">
                <h2 className="text-2xl font-semibold mb-4">SpaceX Launches</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {loading ? (
                    <p>Loading...</p>
                ) : launches.length > 0 ? (
                    <div className="overflow-y-auto flex-1 max-h-64">
                        <table className="table-auto w-full border-collapse border border-gray-400">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2">Mission Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Launch Date</th>
                                    <th className="border border-gray-300 px-4 py-2">Launch Site</th>
                                    <th className="border border-gray-300 px-4 py-2">Success</th>
                                </tr>
                            </thead>
                            <tbody>
                                {launches.map((launch) => (
                                    <tr key={launch.flight_number} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{launch.mission_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(launch.launch_date_utc).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{launch.launch_site.site_name}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {launch.launch_success ? 'Yes' : 'No'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
};

export default SpaceXLaunches;

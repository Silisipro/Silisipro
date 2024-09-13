import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventModal from '../../components/calendar/addEventModal';
import DetailModal from '../../components/calendar/detailModal';
import {  listEvents } from '../../store/serviceSlice/servicegoogleSlice'; 

const CalendarComponent = () => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const ShowDetail = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeDetailModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

     const handleOpenModal = () => setShowModal(true);
     const handleCloseModal = () => setShowModal(false);

    const { events, event, loading, error, status } = useSelector((state) => state.servicegoogle);


    function formatDate(dateString) {
        if (!dateString) {
            return "Not defined";
        }
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) {
            return "Not defined";
        }
    
        const formattedDateTime = date.toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        return formattedDateTime;
    }



    useEffect(() => {
        if(status ==="idle") {
            dispatch(listEvents({ maxResults: 100 }));
        }
    }, [dispatch]);

    return (
        <div>
             <EventModal showModal={showModal} handleClose={handleCloseModal} />
            {selectedEvent && (
                 <DetailModal isOpen={isModalOpen} onClose={closeDetailModal} event={selectedEvent} />
            )}

            <div className="top-2 left-2 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 h-[600px] flex flex-col bg-white bg-opacity-80">
                    <h2 className="text-2xl font-semibold mb-4">Google Calendar Events</h2>
                   
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {loading ? (
                        <p>Loading...</p>
                    ) : events ? (
                        <div className="overflow-y-auto flex-1"> 
                            {(events).length > 0 ? (
                
                                    <div className="mb-8">
                                    
                                        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
                                            <div className="bg-blue-500 flex justify-between p-4 text-white">
                                                <h3 className="text-xl font-bold">Upcoming Events:</h3>
                                                <button
                                                    onClick={handleOpenModal}
                                                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300"
                                                    >
                                                    Add New Event
                                                </button>

                                            </div>
                                            <div className="p-4">
                                                <table className="table-auto w-full border-collapse border border-gray-400">
                                                    <thead>
                                                        <tr className="bg-gray-100">
                                                            <th className="border border-gray-300 px-4 py-2">Event</th>
                                                            <th className="border border-gray-300 px-4 py-2">Organizer</th>
                                                            <th className="border border-gray-300 px-4 py-2">Starts date </th>
                                                            <th className="border border-gray-300 px-4 py-2">End date</th>
                                                            <th className="border border-gray-300 px-4 py-2">Created at</th>
                                                            <th className="border border-gray-300 px-4 py-2">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                    
                                                    {events.map((event, index) => (
                                                        <tr key={event.id} className="text-center">
                                                           <td className="border border-gray-300 px-4 py-2 truncate">{event.summary}</td>
                                                                <td className="border border-gray-300 px-4 py-2">{event.organizer.email}</td>
                                                                <td className="border border-gray-300 px-4 py-2">{formatDate(event.start.dateTime) }</td>
                                                                <td className="border border-gray-300 px-4 py-2">{formatDate(event.end.dateTime) }</td>
                                                                <td className="border border-gray-300 px-4 py-2">{formatDate(event.created) }</td>
                                                                <td className="border border-gray-300 px-4 py-2">
                                                                    <button
                                                                        onClick={() => ShowDetail(event)}
                                                                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300"
                                                                        >
                                                                        View
                                                                    </button>
                                                                </td>
                                                        </tr>
                                                    ))}
                                                       
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                             
                            ) : (
                                <p>No data available .</p>
                            )}
                        </div>
                    ) : (
                        <p>No data available.</p>
                    )}
                </div>
        </div>
        </div>
    );
};

export default CalendarComponent;

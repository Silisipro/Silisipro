import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../store/serviceSlice/servicegoogleSlice';
import './addEventModal.css'

const EventModal = ({ showModal, handleClose }) => {
    const dispatch = useDispatch();

    const { status } = useSelector((state) => state.servicegoogle);
   
    const [summary, setSummary] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const formatDateToISO = (date) => {
        const eventDate = new Date(date);
        const offset = -eventDate.getTimezoneOffset() / 60;  
        const timezone = offset > 0 ? `+${offset.toString().padStart(2, '0')}:00` : `-${Math.abs(offset).toString().padStart(2, '0')}:00`;
        
        return eventDate.toISOString().slice(0, 19) + timezone;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const event_data = {
            summary: summary,
            start: {
                dateTime: formatDateToISO(startDate),
                timeZone: "America/Los_Angeles",
            },
            end: {
                dateTime: formatDateToISO(endDate),
                timeZone: "America/Los_Angeles",
            },
        };
      
        dispatch(createEvent({event_data}));

        if(status ==="created"){
            alert('Event add succefully')
        }
     
        handleClose();
    };

 
    if (!showModal) return null;

    return (
        <div className="modal-setting">
        <div className="modal-content-setting">
            <h2>Add New Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Event Summary:</label>
                    <input
                        type="text"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Enter event summary"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Start Date & Time:</label>
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>End Date & Time:</label>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <div className="modal-actions">
                    <button className="btn cancel" type="button" onClick={handleClose}>Cancel</button>
                    <button className="btn ok" type="submit">Add Event</button>
                </div>
            </form>
        </div>
    </div>
    
    );
};

export default EventModal;

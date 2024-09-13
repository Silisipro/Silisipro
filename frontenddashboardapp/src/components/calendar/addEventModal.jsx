import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../store/serviceSlice/servicegoogleSlice';
import './addEventModal.css'

const EventModal = ({ showModal, handleClose }) => {
    const dispatch = useDispatch();

   
    const [summary, setSummary] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEvent = {
            summary: summary,
            start: {
                dateTime: startDate,
                timeZone: "America/Los_Angeles",
            },
            end: {
                dateTime: endDate,
                timeZone: "America/Los_Angeles",
            },
        };

      console.log(newEvent);
      
        dispatch(createEvent(newEvent));

     
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

import { useState } from 'react';

export const ModalUserDetail = ({ isOpen, onClose, user }) => {

  if (!isOpen) return null;


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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{user.nam}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            ✖
          </button>
        </div>
        <div className="space-y-4">
          <p><strong>Organizer:</strong> {user.email}</p>
          
          <p><strong>Created at:</strong> {formatDate(user.created_at)}</p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


export default ModalUserDetail;
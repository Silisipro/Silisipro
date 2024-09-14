import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation , useNavigate } from 'react-router-dom';
import DetailModal from './detailUser';
import {  listUser, mashAdmin, deleteUser } from '../../store/auth/user'; 

const UserComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); 

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

  const ShowDetail = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeDetailModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const swhoList = () => {
    navigate('/dashboard/dashboard/admin');
  }

    const {  userlist, loading, error } = useSelector((state) => state.user);


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
        dispatch(listUser());
    }, [dispatch]);

    return (
        <div>
            {selectedUser && (
                 <DetailModal isOpen={isModalOpen} onClose={closeDetailModal} user={selectedUser} />
            )}

            <div className="top-2 left-2 bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 h-[600px] flex flex-col bg-white bg-opacity-80">
                    <h2 className="text-2xl font-semibold mb-4">Users lists</h2>
                   
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {loading ? (
                        <p>Loading...</p>
                    ) : userlist ? (
                        <div className="overflow-y-auto flex-1"> 
                            {(userlist).length > 0 ? (
                
                                    <div className="mb-8">
                                    
                                        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
                                            <div className="bg-blue-500 flex justify-between p-4 text-white">
                                                <h3 className="text-xl font-bold">Lists</h3>
                                                <button
                                                    onClick={swhoList}
                                                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300"
                                                    >
                                                    Admin list
                                                </button>

                                            </div>
                                            <div className="p-4">
                                                <table className="table-auto w-full border-collapse border border-gray-400">
                                                    <thead>
                                                        <tr className="bg-gray-100">
                                                            <th className="border border-gray-300 px-4 py-2">Name</th>
                                                            <th className="border border-gray-300 px-4 py-2">Email</th>
                                                            <th className="border border-gray-300 px-4 py-2">Created at</th>
                                                            <th className="border border-gray-300 px-4 py-2">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                    
                                                    {userlist.map((user, index) => (
                                                        <tr key={user.id} className="text-center">
                                                           <td className="border border-gray-300 px-4 py-2 truncate">{user.name}</td>
                                                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                                                <td className="border border-gray-300 px-4 py-2">{formatDate(user.created_at) }</td>
                                                                <td className="border border-gray-300 px-4 py-2">
                                                                    <button
                                                                        onClick={() => ShowDetail(user)}
                                                                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300"
                                                                        >
                                                                        View
                                                                    </button>
                                                                    <button
                                                                        onClick={() => dispatch(mashAdmin(user.id))}
                                                                        className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300"
                                                                        >
                                                                        Mask admin
                                                                    </button>
                                                                    <button
                                                                        onClick={() => dispatch(deleteUser(user.id))}
                                                                        className="bg-red-600 hover:bg-danger-800 text-white font-bold py-2 px-4 rounded transition duration-300"
                                                                        >
                                                                        Delete
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

export default UserComponent;

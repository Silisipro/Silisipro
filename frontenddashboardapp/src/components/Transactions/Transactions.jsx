import React, { useEffect, useState } from 'react';
import "./Transactions.css";
import { transactions } from "../../data/data";
import { iconsImgs } from "../../utils/images";
import { getStatics} from '../../store/auth/user'; 
import { useDispatch, useSelector } from 'react-redux';


const Transactions = () => {

    const dispatch = useDispatch();

    const {  userStatistic } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getStatics());
    }, [dispatch]);

  return (
    <div className="grid-one-item grid-common grid-c2">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Users</h3>
            <button className="grid-c-title-icon">
                <img src={ iconsImgs.plus } />
            </button>
        </div>

        <div className="grid-content">
            <div className="grid-items">
                
                   
                        <div className="grid-item">
                            <div className="grid-item-l">
                                <div className="avatar img-fit-cover">
                                <img src={ iconsImgs.plus } />
                                </div>
                                <p className="text">Users</p>
                            </div>
                            <div className="grid-item-r">
                                <span className="text-scarlet">{ userStatistic.users }</span>
                            </div>
                        </div>

                        <div className="grid-item">
                            <div className="grid-item-l">
                                <div className="avatar img-fit-cover">
                                <img src={ iconsImgs.plus } />
                                </div>
                                <p className="text">Admins</p>
                            </div>
                            <div className="grid-item-r">
                                <span className="text-scarlet">{ userStatistic?.admins }</span>
                            </div>
                        </div>


                        <div className="grid-item">
                            <div className="grid-item-l">
                                <div className="avatar img-fit-cover">
                                <img src={ iconsImgs.plus } />
                                </div>
                                <p className="text">All users</p>
                            </div>
                            <div className="grid-item-r">
                                <span className="text-scarlet">{ userStatistic?.allUsers }</span>
                            </div>
                        </div>

                        
                 
                
            </div>
        </div>
    </div>
  )
}

export default Transactions

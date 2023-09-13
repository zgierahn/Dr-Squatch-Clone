import React from 'react'
import { useState } from "react"; // , useEffect
import { useDispatch } from 'react-redux'  //  , useSelector
import { useParams } from 'react-router-dom';
import { thunkDeleteAddress } from '../../store/session';

import "./ConfirmationModal.css"


function ConfirmDeleteAddressModal({addressId}) {

    const {userId} = useParams();
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

console.log("userId & addressId", userId, addressId);

    const toggleButton = () => {
    setModal(!modal)
    }

  return (
    <div>

        <button className='changeUserProfile'
            onClick={()=>{toggleButton()
            }}>
                Delete Address
        </button>

        {modal && (
            <div className='reviewModalOverlay'>
                <div className='reviewModal'>
                    <h1 className='confirmModalTitles'>
                        Do you want to delete your Address?
                    </h1>
                    <span className='confirmButtonSpan'>
                    <button className='reviewModalButtons'
                    onClick={()=>{
                    dispatch(thunkDeleteAddress(userId, addressId))
                    toggleButton()
                     }}>
                        Delete Address
                    </button>
                    <button className='reviewModalButtons'
                    onClick={()=>{toggleButton()}}>
                        Cancel
                    </button>
                    </span>
                </div>
            </div>
        )}

    </div>
  )
}

export default ConfirmDeleteAddressModal

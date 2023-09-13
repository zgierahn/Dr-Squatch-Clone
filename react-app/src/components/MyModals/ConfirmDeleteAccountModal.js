import React from 'react'
import { useState } from "react"; // , useEffect
import { useDispatch } from 'react-redux'  //  , useSelector
import { useHistory } from 'react-router-dom';
import { thunkDeleteUser } from '../../store/session';
import "./ConfirmationModal.css"


function ConfirmDeleteAccountModal({userId}) {

const dispatch = useDispatch();
const history = useHistory();
const [modal, setModal] = useState(false);

const toggleButton = () => {
    setModal(!modal)
}
const deleteAccount = () => {
    dispatch(thunkDeleteUser(userId))
    toggleButton();
    history.push("/");
}

  return (
    <div>

        <button className='deleteAccountButton'
            onClick={()=>{toggleButton()
            }}>
                Delete Account
        </button>

        {modal && (
            <div className='reviewModalOverlay'>
                <div className='reviewModal'>
                    <h1 className='confirmModalTitles'>
                        Do you want to delete your Account and lose your loyalty points?
                    </h1>
                    <span className='confirmButtonSpan'>
                    <button className='reviewModalButtons'
                    onClick={()=>{deleteAccount()
                   }}>
                        Delete Account
                    </button>
                    <button className='reviewModalButtons'
                    onClick={()=>{toggleButton()
                    }}>
                        Cancel
                    </button>
                    </span>
                </div>
            </div>
        )}

    </div>
  )
}

export default ConfirmDeleteAccountModal

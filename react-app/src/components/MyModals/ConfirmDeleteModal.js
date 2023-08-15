import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { thunkDeleteReview } from '../../store/review'

import "./ConfirmationModal.css"


function ConfirmDeleteModal({review}) {

const dispatch = useDispatch();
const [modal, setModal] = useState(false);

const toggleButton = () => {
    setModal(!modal)
}

  return (
    <div>

        <button className='editReviewButton'
            onClick={()=>{toggleButton()
            }}>
                Delete Review
        </button>

        {modal && (
            <div className='reviewModalOverlay'>
                <div className='reviewModal'>
                    <h1>Do you want to delete your Review?</h1>
                    <span className='confirmButtonSpan'>
                    <button onClick={()=>{
                    dispatch(thunkDeleteReview(review.id))
                    toggleButton()
                     }}>
                        Delete Review
                    </button>
                    <button onClick={()=>{toggleButton()}}>
                        Cancel
                    </button>
                    </span>
                </div>
            </div>
        )}

    </div>
  )
}

export default ConfirmDeleteModal

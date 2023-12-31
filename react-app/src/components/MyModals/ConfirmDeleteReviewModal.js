import React from 'react'
import { useState } from "react"; // , useEffect
import { useDispatch } from 'react-redux'  //  , useSelector
import { thunkDeleteReview } from '../../store/review'

import "./ConfirmationModal.css"


function ConfirmDeleteReviewModal({review}) {

const dispatch = useDispatch();
const [modal, setModal] = useState(false);

const toggleButton = () => {
    setModal(!modal)
}

  return (
    <div>

        <button className='confirmButton'
            onClick={()=>{toggleButton()
            }}>
                Delete Review
        </button>

        {modal && (
            <div className='reviewModalOverlay'>
                <div className='reviewModal'>
                    <h1 className='confirmModalTitles'>
                        Do you want to delete your Review?
                    </h1>
                    <span className='confirmButtonSpan'>
                    <button className='reviewModalButtons'
                    onClick={()=>{
                    dispatch(thunkDeleteReview(review.id))
                    toggleButton()
                     }}>
                        Delete Review
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

export default ConfirmDeleteReviewModal

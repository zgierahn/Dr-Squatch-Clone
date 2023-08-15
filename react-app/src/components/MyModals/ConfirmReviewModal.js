import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import "./ConfirmReviewModal.css"


function ConfirmReviewModal() {

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
                Edit Review
        </button>

        {modal && (
            <div>
                <div className='reviewModal'>
                    <h1>Do you want to edit your Review?</h1>
                    <button>
                        Yes
                    </button>
                    <button onClick={()=>{toggleButton()}}>
                        No
                    </button>
                </div>
            </div>
        )}

    </div>
  )
}

export default ConfirmReviewModal

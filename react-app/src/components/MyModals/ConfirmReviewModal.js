import React, { useState } from "react";  //  , useEffect
import { useDispatch } from 'react-redux'  //  , useSelector
import { thunkEditReview } from '../../store/review';

import "./ConfirmationModal.css"


function ConfirmReviewModal({review}) {

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState(review.title);
    const [body, setBody] = useState(review.body);
    const [rating, setRating] = useState(review.rating);
    const [activeRating, setActiveRating] = useState(rating);

    const toggleButton = () => {
        setModal(!modal)
    }

    const submitReveiw = () => {
        dispatch(thunkEditReview({title, body, rating }, review.id))
        toggleButton()
    }

  return (
    <div>

        <button className='confirmButton'
            onClick={()=>{toggleButton()
            }}>
                Edit Review
        </button>

        {modal && (
            <div className='reviewModalOverlay'>
                <div className='reviewModal'>
                    <h1 className="confirmModalTitles">
                        Do you want to edit your Review?
                    </h1>
                    <section className='reviewFormModal'>
                        <label className="editReviewTitles">
                            Title:
                        </label>
                        <input type="text"className="reviewTitleInput" value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                        }}/>
                        <label className="editReviewTitles">
                            Description:
                        </label>
                        <textarea type="text"className="reviewDescriptionInput" value={body}
                            onChange={(e) => {
                                setBody(e.target.value)
                        }}/>
                        <section className="star-rating">
                            <div className={activeRating >= 1 ? "filled" : "empty"}
                                onMouseEnter={() => {setActiveRating(1)} }
                                onMouseLeave={() => {setActiveRating(rating)} }
                                onClick={() => {setRating(1)} }
                            >
                                <i className="fa fa-star"></i>
                            </div>
                            <div className={activeRating >= 2 ? "filled" : "empty"}
                                onMouseEnter={() => {setActiveRating(2)} }
                                onMouseLeave={() => {setActiveRating(rating)} }
                                onClick={() => {setRating(2)} }
                            >
                                <i className="fa fa-star"></i>
                            </div>
                            <div className={activeRating >= 3 ? "filled" : "empty"}
                                onMouseEnter={() => {setActiveRating(3)} }
                                onMouseLeave={() => {setActiveRating(rating)} }
                                onClick={() => {setRating(3)} }
                            >
                                <i className="fa fa-star"></i>
                            </div>
                            <div className={activeRating >= 4 ? "filled" : "empty"}
                                onMouseEnter={() => {setActiveRating(4)} }
                                onMouseLeave={() => {setActiveRating(rating)} }
                                onClick={() => {setRating(4)} }
                            >
                                <i className="fa fa-star"></i>
                            </div>
                            <div className={activeRating >= 5 ? "filled" : "empty"}
                                onMouseEnter={() => {setActiveRating(5)} }
                                onMouseLeave={() => {setActiveRating(rating)} }
                                onClick={() => {setRating(5)} }
                            >
                                <i className="fa fa-star"></i>
                            </div>
                        </section>
                    </section>
                    <span className='confirmButtonSpan'>
                        <button className="reviewModalButtons"
                        onClick={()=>{
                             return submitReveiw()
                        }}>
                            Edit Review
                        </button>
                        <button className="reviewModalButtons"
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

export default ConfirmReviewModal

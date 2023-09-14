import React from 'react'
import "./ConfirmationModal.css"


function AddToCartModal({ setCheckoutDiv, setAddToCartDiv }) {




  return (

    <div className='displayContent'>
        <div className='reviewModalOverlay'>
            <div className='reviewModal'>
                <h1 className='confirmModalTitles'>
                    Added to Cart!
                </h1>
                <span className='confirmButtonSpan'>

                <button className='userProfileButton'
                onClick={(e)=>{
                e.stopPropagation();
                setAddToCartDiv(false);
                setCheckoutDiv(true);
                    }}>
                    View Cart
                </button>

                <button className='userProfileButton'
                onClick={(e)=>{
                e.stopPropagation();
                setAddToCartDiv(false)}}>
                    Continue Shopping
                </button>

                </span>
            </div>
        </div>
    </div>
  )
}

export default AddToCartModal

import React from 'react'
import { useState } from "react"; // , useEffect
import { useDispatch } from 'react-redux'  //  , useSelector
import { updateCart } from '../../store/cart';


import "./ConfirmationModal.css"
import CheckoutCartModal from './CheckoutCartModal';


function AddToCartModal({product}) {

const dispatch = useDispatch();
const [modal, setModal] = useState(false);

const addToCartToggleButton = () => {
    setModal(!modal)
}

const addToCart = (product) => {
    if(!localStorage.getItem("shop") ) {
        let shop = {}
        product.quantity = 1;
        shop[product.id] = product;
        localStorage.setItem("shop", JSON.stringify(shop))
        dispatch(updateCart(shop))
    } else {
        let shop = JSON.parse(localStorage.getItem("shop"))
        product.quantity = 1;
        shop[product.id] = product
        localStorage.setItem("shop", JSON.stringify(shop))
        dispatch(updateCart(shop))
    }
}

  return (
    <div className='displayContent'>

        <button className='addToCartButton'
            onClick={(e)=>{
                e.stopPropagation();
                addToCart(product)
                addToCartToggleButton()
            }}>
                + Add to Cart
        </button>

        {modal && (
            <div className='reviewModalOverlay'>
                <div className='reviewModal'>
                    <h1 className='confirmModalTitles'>
                        Added to Cart!
                    </h1>
                    <span className='confirmButtonSpan'>
                    <button className='reviewModalButtons'
                    onClick={(e)=>{
                    e.stopPropagation();
                    addToCartToggleButton()
                     }}>
                        View Cart
                    </button>

                    <CheckoutCartModal button={"View Cart"}/>

                    <button className='userProfileButton'
                    onClick={(e)=>{
                    e.stopPropagation();
                    addToCartToggleButton()}}>
                        Continue Shopping
                    </button>
                    </span>
                </div>
            </div>
        )}

    </div>
  )
}

export default AddToCartModal

import React, { useState } from "react"; // , useEffect
import { useHistory } from "react-router-dom";
import funnyCheckout from "../../images/checkout-gif.gif"
import { updateCart } from "../../store/cart";
import { useDispatch } from "react-redux";
import "./completeCheckout.css"

function CompleteCheckout() {

const dispatch = useDispatch();
const history = useHistory();
const [cartModal, setCartModal] = useState(false);

const toggleButton = () => {
    setCartModal(!cartModal)
}

  return (
    <div className="completeCheckoutMain">

        <button className='addToCartButton'
            onClick={()=>{
                toggleButton()
            }}>
                Checkout
        </button>

        {cartModal && (
            <div className='reviewModalOverlay'>
                <div className='completePurchaseModal'>
                    <img src={funnyCheckout} alt="guy surfing a cart"/>
                    <span className='completePurchaseSpan'>
                    <h1>Thank you for your purchase!</h1>
                    <button className="returnHome" onClick={()=>{
                        localStorage.removeItem("shop");
                        dispatch(updateCart());
                        toggleButton();
                        history.push("/");
                        window.location.reload(true);
                        }}>
                        Return Home
                    </button>
                    </span>
                </div>
            </div>
        )}

    </div>
  )
}

export default CompleteCheckout

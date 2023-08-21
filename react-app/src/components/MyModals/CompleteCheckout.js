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
                    <h1>Would you like to complete your purhase?</h1>
                    <span className="completePurchaseButtonsSpan">
                        <button className="returnHome" onClick={()=>{
                            localStorage.removeItem("shop");
                            dispatch(updateCart());
                            toggleButton();
                            history.push("/");
                            window.location.reload(true);
                        }}>
                            Complete Purchase
                        </button>
                        <button className="returnHome"
                            onClick={()=>{
                                toggleButton();
                            }}>
                            Cancel
                        </button>
                    </span>
                    </span>
                </div>
            </div>
        )}

    </div>
  )
}

export default CompleteCheckout

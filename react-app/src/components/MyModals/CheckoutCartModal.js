import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from "../../store/cart";
import shoppingCart from "../../images/Cart-Logo.png"
import exit from "../../images/orange-exit.png"
import './CheckoutCartModal.css'


function CheckoutCartModal() {

const dispatch = useDispatch();
let cartState = useSelector(state => state.cart);
const [modal, setModal] = useState(false);

const toggleShoppingButton = () => {
    setModal(!modal)
}



let shop;
if (Object.values(cartState.cart)) {
    shop = Object.values(cartState.cart)
}

const deleteItem = (productId ) => {
    let shop = JSON.parse(localStorage.getItem("shop"))
    delete shop[productId]
    localStorage.setItem("shop", JSON.stringify(shop))
    dispatch(updateCart(shop))
}

const changeQuantity = (productId, int) => {
    let shop = JSON.parse(localStorage.getItem("shop"))
    if(shop[productId].quantity + int === 0){
        delete shop[productId]
    } else {
        shop[productId].quantity += int
    }
    localStorage.setItem("shop", JSON.stringify(shop))
    dispatch(updateCart(shop))
}

useEffect(() => {

    if(localStorage.getItem("shop")) {
        let shop = JSON.parse(localStorage.getItem("shop"))
        dispatch(updateCart(shop))
    }

}, [dispatch])

return (
    <div>

        <button className='reserve-button'
        onClick={()=>{toggleShoppingButton()}}
        >
            <img className="shoppingCart" src={shoppingCart} alt="shopping cart" />
        </button>

        {modal && (
            <div className='cart-modal'>
                <div className='overlay'></div>
                <div className='cart-content'>
                    <header className="cartHeader">
                        <span className="cartTitleSpan">
                            <h1>Your Cart</h1>
                            <button onClick={()=>{toggleShoppingButton()}} className='close-review-modal'>
                                <img className="exitButton" src={exit} alt="shopping cart" />
                            </button>
                        </span>
                        <div>
                            Free Shipping at $55
                        </div>
                    </header>
                    <section className="shoppingCartItems">
                    {!!shop.length &&
                        shop.map((product)=>{
                            return <div key={product.id} className="shoppingCartItem">
                                <span className="cartItemInfoSpan">
                                    <div className="cartItemImageDiv">
                                        <img className="cartItemPhoto" src={product.photos} alt="product image" />
                                    </div>
                                    <div className="cartItemDescriptionDiv">
                                        <p className="CartProductName">{product.name}</p>
                                        <div>{product.category}</div>
                                        <div className="quantityContainer">
                                            <button onClick={()=>{changeQuantity(product.id, -1)}}>
                                                -
                                            </button>
                                            <div className="innerQuantityContainer">
                                                Quantity:
                                                <div>{product.quantity}</div>
                                            </div>
                                            <button onClick={()=>{changeQuantity(product.id, 1)}}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </span>
                                <span className="cartPriceSpan">
                                    <div className="cartPriceDiv">
                                        ${product.price}
                                    </div>
                                    <button className="cartRemoveButton" onClick={()=>{deleteItem(product.id)}}>
                                        Remove
                                    </button>
                                </span>
                            </div>
                        })
                    }
                    </section>
                    <footer className="checkoutFooter">
                        <span className="subTotalSpan">
                            <div>
                                SubTotal:
                            </div>
                            <div>
                                Amount
                            </div>
                        </span>
                        <button className="addToCartButton">
                            Checkout
                        </button>
                    </footer>
                </div>
            </div>
        )}

    </div>


  )
};

export default CheckoutCartModal

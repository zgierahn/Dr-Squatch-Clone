import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from "../../store/cart";
import shoppingCart from "../../images/Cart-Logo.png"
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
    shop[productId].quantity += int
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
                    <h1>Shopping Cart</h1>
                    {!!shop.length &&
                        shop.map((product)=>{
                            return <div key={product.id} className="shoppingCartItem">
                                <div>Product Id: {product.id}</div>
                                <div>{product.name}</div>
                                <div>Price:${product.price}</div>
                                <div className="quantityContainer">
                                    <button onClick={()=>{changeQuantity(product.id, -1)}}>-</button>
                                    <div className="innerQuantityContainer">
                                        Quantity:
                                        <div>{product.quantity}</div>
                                    </div>
                                    <button onClick={()=>{changeQuantity(product.id, 1)}}>+</button>
                                </div>
                                <button
                                    onClick={()=>{deleteItem(product.id)}}
                                >Delete</button>
                            </div>
                        })

                    }
                    <button onClick={()=>{toggleShoppingButton()}} className='close-review-modal'>Close Cart</button>
                </div>
            </div>
        )}

    </div>


  )
};

export default CheckoutCartModal

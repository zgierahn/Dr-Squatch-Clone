import { useState } from "react";
import './CheckoutCartModal.css'

function CheckoutCartModal() {
const [modal, setModal] = useState(false);

const toggleShoppingButton = () => {
    setModal(!modal)
}

if(modal) document.body.classList.add('active-modl')
if(!modal) document.body.classList.remove('active-modl')
// let shop;

// if(!shop) return null
//needs shortcircuit
let getLocalStorage = localStorage.getItem("shop")


let shop = Object.values(JSON.parse(getLocalStorage))
console.log('what is my shop right now', shop);


const deleteItem = (productId ) => {
        let shop = JSON.parse(localStorage.getItem("shop"))
        delete shop[productId]
        localStorage.setItem("shop", JSON.stringify(shop))
    }




return (
        <div>

            <button className='reserve-button'
            onClick={()=>{toggleShoppingButton()}}
            >Cart</button>

        {modal && getLocalStorage && (
            <div className='cart-modal'>
                <div className='overlay'></div>
                <div className='cart-content'>
                    <h1>Shopping Cart</h1>
                    {shop &&
                        shop.map((product)=>{
                            return <div key={product.id}>
                                <div>Product Id: {product.id}</div>
                                <div>{product.name}</div>
                                <div>Price:${product.price}</div>
                                <div className="quantityContainer">
                                    <button>-</button>
                                    <div>
                                        Quantity:
                                        <div>{product.quantity}</div>
                                    </div>
                                    <button>+</button>
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

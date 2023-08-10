import { useState } from "react";
import './CheckoutCartModal.css'

function CheckoutCartModal() {
const [modal, setModal] = useState(false);

const toggleReserveButton = () => {
    setModal(!modal)
}

if(modal) document.body.classList.add('active-modl')
if(!modal) document.body.classList.remove('active-modl')


let shop = Object.values(JSON.parse(localStorage.getItem("shop")))
console.log('what is my shop right now', shop);


// const chageQuantity = (product, ) => {
//     if(!localStorage.getItem("shop") ) {
//         let shop = {}
//         product.quanity = 1;
//         shop[product.id] = product;
//         localStorage.setItem("shop", JSON.stringify(shop))
//     } else {
//         let shop = JSON.parse(localStorage.getItem("shop"))
//         product.quanity = 1;
//         shop[product.id] = product
//         localStorage.setItem("shop", JSON.stringify(shop))
//     }

// }


return (
        <div>

            <button className='reserve-button'
            onClick={()=>{toggleReserveButton()}}
            >Cart</button>

        {modal && (
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
                                <button>Delete</button>
                            </div>
                        })

                    }
                    <button onClick={()=>{toggleReserveButton()}} className='close-review-modal'>Close Cart</button>
                </div>
            </div>

         )}

        </div>


  )
};

export default CheckoutCartModal

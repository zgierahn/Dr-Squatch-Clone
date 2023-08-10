import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetProducts } from '../../store/product';
import './products.css';



function Products() {
const dispatch = useDispatch();
let allProducts = useSelector(state => Object.values(state.product.allProducts))

useEffect(() => {
    dispatch(thunkGetProducts())
}, [dispatch])

const addToCart = (product) => {
    if(!localStorage.getItem("shop") ) {
        let shop = {}
        product.quantity = 1;
        shop[product.id] = product;
        localStorage.setItem("shop", JSON.stringify(shop))
    } else {
        let shop = JSON.parse(localStorage.getItem("shop"))
        product.quantity = 1;
        shop[product.id] = product
        localStorage.setItem("shop", JSON.stringify(shop))
    }

}

	return (
		<main>
        <header>
            <div className='ProductsImageBanner'>
                <h1>Products Banner</h1>
            </div>
            <section className='outerProductsContainer'>
                <ul className='productListBar'>
                    <h3>Essentials</h3>
                    <button>Bar Soaps</button>
                    <button>Face Wash</button>
                    <button>Hair Care</button>
                    <button>Deodorant</button>
                    <button>Lotion</button>
                    <button>Cologne</button>
                    <h3>More Products</h3>
                    <button>Shower Boosters</button>
                    <button>Candles</button>
                    <button>Beard Oil</button>
                    <button>Gift Cards</button>
                    <button>Swag</button>
                    <button>Toothpaste</button>
                </ul>
                <div className='mainProductsContainer'>
                    {allProducts.map((product)=>{
                        return <div className='productContainer' key={product.id} value={product.id}>
                                    <h3>{product.name}</h3>
                                    <h3>${product.price}</h3>
                                    <p>{product.description}</p>
                                    <button onClick={()=>{
                                        addToCart(product)
                                    }}>
                                        Add to Cart
                                    </button>
                               </div>
                    })}
                </div>
            </section>
        </header>


		</main>
	);
};

export default Products;

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { thunkGetSingleProduct } from '../../store/product'
import { thunkGetReviewsByProduct } from '../../store/review'
import ConfirmReviewModal from '../MyModals/ConfirmReviewModal'
import ConfirmDeleteModal from '../MyModals/ConfirmDeleteModal'
import { updateCart } from '../../store/cart';
import "./singleProduct.css"

function SingleProduct() {

    const history = useHistory();
    const dispatch = useDispatch();
    const {productId} = useParams();
    const [quantity, setQuantity] = useState(1);
    let product = useSelector(state => state.product.singleProduct)
    let allReviews = useSelector(state => Object.values(state.review.reviews))
    let session = useSelector(state => Object.values(state.session))
    let userReviews = new Set();
    allReviews.forEach(review=>{userReviews.add(review.userId)})

    useEffect(() => {
    dispatch(thunkGetReviewsByProduct(productId))
    dispatch(thunkGetSingleProduct(productId))
}, [dispatch, productId])

const addToCart = (product) => {
    if(!localStorage.getItem("shop") ) {
        let shop = {}
        product.quantity = quantity;
        shop[product.id] = product;
        localStorage.setItem("shop", JSON.stringify(shop))
        dispatch(updateCart(shop))
    } else {
        let shop = JSON.parse(localStorage.getItem("shop"))
        product.quantity = quantity;
        shop[product.id] = product
        localStorage.setItem("shop", JSON.stringify(shop))
        dispatch(updateCart(shop))
    }
}

    return (
    <main>
        <div className='mainProductContainer'>
            <section className='leftSideContainer'>
                <nav className='trackWebLocation'>
                    <div>Home</div>
                    <div>-</div>
                    <div>{product.category}</div>
                    <div>-</div>
                    <div>{product.name}</div>
                </nav>
                <div className='outerImagesContainer'>
                    <div className='innerImagesContainer'>
                        <img className="singleProductImage" src={product.photos} alt="picute of product"/>
                    </div>
                </div>
            </section>
            <section className='rightSideContainer'>
                <div className='SPCategory'>{product.category}</div>
                <header className='SingleProductName'>
                    {product.name}
                </header>
                {product.reviews && product.reviews.length > 0 ? <div>{product.reviews.length} reviews</div> : <div>New!</div>}
                <div className='SPdescription'>{product.description}</div>
                <span className='singleProductSpan'>
                    <div>image 1</div>
                    <div>image 2</div>
                </span>
                <div className='selectPricesContainer'>
                    <span className='multiBuy' onClick={()=>{setQuantity(1)}}>
                        <div >Buy 1</div>
                        <div>${product.price} / each</div>
                    </span>
                    <span className='multiBuy'onClick={()=>{setQuantity(2)}}>
                        <div>Buy 2</div>
                        <div>${product.price} / each</div>
                    </span>
                    <span className='multiBuy'onClick={()=>{setQuantity(3)}}>
                        <div>Buy 3</div>
                        <div>${product.price} / each</div>
                    </span>
                </div>
                <button className='addToCartButton' onClick={()=>{addToCart(product)}}>
                    ${product.price * quantity} | Add to Cart
                </button>
            </section>
        </div>
        <section className='lowerProductSection'>
            <div className='productReviewsHeader'>
                <h1>Reviews</h1>
                <div> Avg Review #</div>
                <span>
                    <div>Review Stars</div>
                    <div># of Reviews</div>
                </span>
            </div>
            <div className='searchAndCreateReviewsContainer'>
            </div>
            <div className='productReviewsContainter'>
                {session[0]?.id && !userReviews.has(session[0]?.id) &&
                    <button className='addAReviewButton'
                    onClick={()=>{history.push(`/products/${productId}/reviews/new`)}}>
                        Add a Review
                    </button>
                }
                {allReviews.map((review)=>{
                return <div key={review.id} className='singleReviewContainer'>
                        <span className='reviewDataContainer'>
                            <span className='reviewNameSpan'>
                                <div>{review.firstName}{review.lastName}</div>
                                <div>Verified Buyer</div>
                            </span>
                            <div>
                                rating: {review.rating}
                            </div>
                            <div>{review.title}</div>
                            <div>{review.body}</div>
                        </span>
                        <div className='reviewDateContainer'>
                            <div>
                                {review.createdAt}
                            </div>
                            {session[0]?.id === review.userId && (
                                <span>
                                <ConfirmDeleteModal review={review}/>
                                <ConfirmReviewModal review={review}/>
                                </span>
                            )}
                        </div>
                        </div>
                })}
            </div>
        </section>
    </main>
  )
};

export default SingleProduct

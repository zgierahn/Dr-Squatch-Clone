import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkGetSingleProduct } from '../../store/product';
import { thunkGetReviewsByProduct } from '../../store/review';
import { updateCart } from '../../store/cart';
import ConfirmReviewModal from '../MyModals/ConfirmReviewModal';
import ConfirmDeleteReviewModal from '../MyModals/ConfirmDeleteReviewModal';
import CheckoutCartModal from '../MyModals/CheckoutCartModal';
import AddToCartModal from '../MyModals/AddToCartModal';
import crossBones from "../../images/cross-bones.png";
import drops from "../../images/drops.png";
import handWorld from "../../images/hand-world.png";
import soapBar from "../../images/soap-bar.png";
import "./singleProduct.css"

function SingleProduct() {

    const history = useHistory();
    const dispatch = useDispatch();
    const {productId} = useParams();
    const [quantity, setQuantity] = useState(1);
    const [checkoutDiv, setCheckoutDiv] = useState(false);
    const [addToCartDiv, setAddToCartDiv] = useState(false);
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
        <nav className='trackWebLocation'>
            <div className='productNav'>Home</div>
            <div>-</div>
            <div className='productNav'>{product.category}</div>
            <div>-</div>
            <div className='productNav'>{product.name}</div>
        </nav>
        <div className='mainProductContainer'>
            <section className='leftSideContainer'>
                    <div className='innerImagesContainer'>
                        <img className="singleProductImage" src={product.photos} alt="picute of product"/>
                    </div>
            </section>
            <section className='rightSideContainer'>
                <div className='sPCategory'>{product.category}</div>
                <header className='singleProductName'>
                    {product.name}
                </header>
                {product.reviews && product.reviews.length > 0 ?
                    <div className='numReviews'>{product.reviews.length} reviews</div> :
                    <div className='numReviews'>New!</div>
                }
                <div className='sPdescription'>{product.description}</div>
                <span className='singleProductSpan'>
                    <div className='miniLogoContainer'>
                        <img src={drops} alt="three drops" />
                        <p className='miniLogoText'>Made from</p>
                        <p className='miniLogoText'>natural oils</p>
                    </div>
                    <div className='miniLogoContainer'>
                        <img src={crossBones} alt="cross bones" />
                        <p className='miniLogoText'>No harsh</p>
                        <p className='miniLogoText'>chemicals</p>
                    </div>
                    <div className='miniLogoContainer'>
                        <img src={soapBar} alt="bar of soap" />
                        <p className='miniLogoText'>Cold process</p>
                    </div>
                    <div className='miniLogoContainer'>
                        <img src={handWorld} alt="hand under world" />
                        <p className='miniLogoText'>Sustainably</p>
                        <p className='miniLogoText'> sourced</p>
                    </div>
                </span>
                <hr className='singleProdHR'></hr>
                <div className='selectQuantityTitle'>
                    Select Quantity:
                </div>
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

                {addToCartDiv && <AddToCartModal setAddToCartDiv={setAddToCartDiv} setCheckoutDiv={setCheckoutDiv}/>}
                {checkoutDiv && <CheckoutCartModal setCheckoutDiv={setCheckoutDiv}/>}

                <button className='addToCartButton'
                onClick={()=>{addToCart(product)
                setAddToCartDiv(true);
                }}>
                    ${product.price * quantity} | Add to Cart
                </button>
            </section>
        </div>
        <section className='lowerProductSection'>
            <div className='productReviewsHeader'>
                <h1 className='reviewsTitle'>Reviews</h1>
                {/* <span className='avgReviewSpan'>
                    <div> Avg Rating</div>
                    {product.reviews && product.reviews.length > 0 ?
                    <div className='none'>{product.reviews.length} reviews</div> :
                    <div className='none'>New!</div>
                }
                </span> */}
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
                        <span className='reviewInfoContainer'>
                            <span className='reviewNameSpan'>
                                <div className='bold'>
                                    {review.firstName} {review.lastName[0]}.
                                </div>
                                {/* <div>Verified Buyer</div> */}
                            </span>
                            <div>
                                rating: {review.rating}
                            </div>
                            <div className='bold'>{review.title}</div>
                            <div>{review.body}</div>
                        </span>
                        <div className='reviewDateContainer'>
                            <div className='reviewDateDiv'>
                                {/* {review.createdAt} */}
                                {review.createdAt.slice(8,11)} {review.createdAt.slice(5,7)}, {review.createdAt.slice(12,17)}
                            </div>
                            {session[0]?.id === review.userId && (
                                <span className='conditionalReviewButtonSpan'>
                                <ConfirmDeleteReviewModal review={review}/>
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

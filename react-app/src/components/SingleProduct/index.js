import React from 'react'
import "./singleProduct.css"

function SingleProduct() {


  return (
    <main>
        <div className='mainProductContainer'>
            <section className='leftSideContainer'>
                <nav className='trackWebLocation'>
                    Nav Bar PlaceHolder
                </nav>
                <div className='imagesContainer'>
                    <div>This is an image</div>
                </div>
            </section>
            <section className='rightSideContainer'>
                <header>
                    The Name of the product
                </header>
                <div>reviews</div>
                <div>description</div>
                <span className='singleProductSpan'>
                    <div>image 1</div>
                    <div> image 2</div>
                </span>
                <ul className='selectPricesContainer'>
                    <div>Select Price 1</div>
                    <div>Select Price 2</div>
                    <div>Select Price 3</div>

                </ul>
                <button>Add to Cart button</button>
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
            <div className='productReviewsContainter'>
                <div className='singleReviewContainer'>
                    <span className='reviewNameSpan'>
                        <div>Customer name</div>
                        <div>Verified Buyer</div>
                    </span>
                    <div>star rating</div>
                    <div>Title</div>
                    <div>description</div>
                </div>
                <div className='reviewDateContainer'>
                    Date
                </div>
            </div>

        </section>

    </main>

  )
}

export default SingleProduct

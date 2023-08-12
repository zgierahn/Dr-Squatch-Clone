import React from 'react'

function SingleProduct() {


  return (
    <main>
        <div>SingleProduct</div>
        <body className='mainProductContainer'>
            <section className='leftSideContainer'>
                <nav>Nav Bar PlaceHolder</nav>
                <div className='immagesContainer'>

                </div>
            </section>
            <section className='rightSideContainer'>
                <header>
                    The Name of the product
                </header>
                <div>reviews</div>
                <div>description</div>
                <span>two images</span>
                <ul>select quantity divs</ul>
                <div>Add to Cart button</div>
            </section>
        </body>
        <section>
            <div>
                <h1>Reviews</h1>
            </div>
            <div>
                Actual Reviews posted
            </div>

        </section>

    </main>

  )
}

export default SingleProduct

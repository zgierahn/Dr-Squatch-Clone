// const GET_CART = "cart/GET_CART"
// const GET_SINGLE_CART = "cart/GET_SINGLE_CART"
const UPDATE_CART = 'cart/UPDATE_CART'

// export const getCart = (cart) => ({
//     type:GET_CART,
//     data:cart
// })

export const updateCart = (cart) => ({
    type:UPDATE_CART,
    data:cart
})

// export const getSingleCart = (cart) => ({
//     type:GET_SINGLE_CART,
//     data:cart
// })




const initialState = {cart:{}}
export default function reducer(state = initialState, action) {
    switch (action.type) {

        case UPDATE_CART: {
            const newState = {...state}
            newState.cart = action.data
            return newState
        }

        default:
            return state
    }
}

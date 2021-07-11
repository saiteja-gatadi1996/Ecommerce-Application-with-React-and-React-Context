import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload

    //checking whether item is already in the add to cart,
    //id+color because we may have same product with different color
    const tempItem = state.cart.find((i) => i.id === id + color)

    //if that item we are selecting is already exist in the cart?
    if (tempItem) {
      const tempCart = state.cart.map((item) => {
        //if we are selecting the same item id+color, then increase the amount with the no. of items we are going to select
        if (item.id === id + color) {
          let newAmount = item.amount + amount

          //checking if out of stock goes
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        } else {
          return item
        }
      })
      return { ...state, cart: tempCart }
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer

//Learnings

// ...state.cart ---> copy all the values from previous cart
//else add as a newItem,

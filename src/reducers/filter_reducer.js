import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    //upon loading products, we are grabbing all the prices of products
    let maxPrice = action.payload.map((product) => product.price)
    maxPrice = Math.max(...maxPrice)
    // console.log(maxPrice)
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      //dont want to disturb other values, just change what we are looking
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    }
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    }
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    }
  }

  if (action.type === SORT_PRODUCTS) {
    //in the top state (line 12), both the below values will be stored, we are just destructuring
    const { sort, filtered_products } = state

    let tempProducts = [...filtered_products]

    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price)
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return {
      ...state,
      filtered_products: tempProducts,
    }
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    }
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const { text, category, company, color, price, shipping } = state.filters
    let tempProducts = [...all_products]

    //if text is false, then tempProducts will be directly returned
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }

    //category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      )
    }

    //company
    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      )
    }

    //colors is Array of arrays (111 line)
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }

    //price, we are filtering the items if we go below to maxPrice
    tempProducts = tempProducts.filter((product) => product.price <= price)

    //shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }

    return { ...state, filtered_products: tempProducts }
  }

  //returning default values that were set in filter_context for only few of them except price
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        //whatever we set and then clicked on clear filter
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        // min_price: 0,
        // max_price: 0,
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer

//Learnings: spread operator is not we are taking as reference in memory, it is like we are copying the values

// line 78, we are setting the name dynamically with the value we type in search

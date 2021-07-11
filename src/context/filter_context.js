import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  //below name picked up from Sort.js option value
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  //products initially empty, that is why as dependency we pass products

  //as we fetch the products, we invoke the dispatch load products

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])

  //based on our 4 values that we sort,
  //this one runs everytime we change the the state value
  //And also run after we setup the products
  //initially we setup our filtered_products to empty array, that is why we are adding products to the dependency array
  //everytime the filters change, run useEffect
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])

  //grab this GridView, LisView functions in Sort.js
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  const updateSort = (e) => {
    //here we have only one value, that is why we are passing in the payload as one value
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value

    //we are clicking on the filters
    if (name === 'category') {
      //getting the text inside of the button
      value = e.target.textContent
      console.log(`this will print the button you click ${value}`)
    }
    if (name === 'color') {
      //in order to access the data-color, we need to use dataset.color
      value = e.target.dataset.color
    }
    //we see the price is converted to string when we are toggling the range from max to min
    if (name === 'price') {
      value = Number(value)
    }

    if (name === 'shipping') {
      value = e.target.checked
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}

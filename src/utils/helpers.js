export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)
}

//mentioned in the Filters.js function
export const getUniqueValues = (data, type) => {
  //accessing the property dynamically
  let unique = data.map((product) => product[type])

  //earlier it used to return Array of arrays
  if (type === 'colors') {
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}

//Learnings

//mapping through the all_products and getting product
//product['category'] , product['company'], product['color']

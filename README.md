## Notes

#### Older React Version

```
"react": "^16.13.1",
"react-dom": "^16.13.1",
"react-scripts": "3.4.3",
```

#### Current React Version

```
"react": "^17.0.1",
"react-dom": "^17.0.1",
"react-scripts": "4.0.0",
```

#### Alternative fix

.env file in the root
FAST_REFRESH=FALSE

#### code

https://github.com/john-smilga/react-course-comfy-store-project-recording/tree/main/src

###

We can add className to return Styled divs

Ex: const CartButtons = () => {
return <Wrapper className="cart-btn-wrapper"></Wrapper>;
}

"cart-btn-wrapper" className is from Navbar Component

value has double braces because, first is to write javascript and second is to write object code

return (
<ProductsContext.Provider value={{}}>
{children}
</ProductsContext.Provider>
);

####

check for Formspree


####

Click on New Form button

###

filtered_products is a copy that we have created from products

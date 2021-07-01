import React, { useState, useReducer } from 'react';
import CartContext from './cart-context'

// function cartReducer( state, action ) {
    
//     const cart = state.items || [];
//     const product = action.product;
//     let updatedItems, updatedItem, updatedItemIndex, updatedCart:Cart;

//     updatedItems = [...cart];
//     updatedItemIndex = updatedItems.findIndex( item => item.id === product.id )
//     console.log('cart reducer', updatedItems[updatedItemIndex])

//     switch( action.type ) {
//       case 'add':

//         if( updatedItemIndex < 0 ) {
//             // item is not already in cart
//             updatedItems.push({ ...product, quantity: 1 })
//         } else {
//             // update quantity only. Can't mutate state here.
//             updatedItem = updatedItems[updatedItemIndex];
//             console.log('updating quantity, before' + updatedItem.quantity, updatedItems[updatedItemIndex].quantity)
//             updatedItem.quantity++;
//             updatedItems[updatedItemIndex] = updatedItem;
//             console.log('updating quantity, after', updatedItems[updatedItemIndex].quantity )
//         }
        
//         return updatedCart = { items: updatedItems, cartCount: state.cartCount + 1 };
//       case 'remove':
//         updatedItem = updatedItems[updatedItemIndex];
//         updatedItem.quantity--;
//         if( updatedItem.quantity <= 0 ) {
//           updatedItems.splice(updatedItemIndex,1);
//         } else {
//           updatedItems[updatedItemIndex] = updatedItem;
//         }
//         return updatedCart = { items: updatedItems, cartCount: state.cartCount - 1 };
//       default:
//           return state;
//     }
//   }

// handles all cart actions, can be accessed in any component
const GlobalCart = (props) => {

    // const [ { items, cartCount }, dispatch] = useReducer(cartReducer, { items: [], cartCount: 0 });

    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
  
    const addToCart = product => {
        console.log('add to cart')

        var updatedItems = [...cartItems];

        console.log(updatedItems)

        let existIndex = updatedItems.findIndex( item => item.id === product.id )
        if( existIndex >= 0 ) {
          console.log( updatedItems, existIndex, updatedItems[existIndex])
          updatedItems[existIndex].quantity = ( updatedItems[existIndex].quantity ? updatedItems[existIndex].quantity++ : 2 );
          setCartItems(updatedItems)
        } else {
          setCartItems([...cartItems, product])
        }

        setCartCount( cartCount + 1 );
        
        // dispatch( {type:"add", product })
    }

    const removeFromCart = product => {
        console.log('remove from cart', product )
        let removeIndex = cartItems.findIndex( item => item.id === product.id);
        let newitems = cartItems.splice( removeIndex, 1 );
        setCartItems( newitems );

        setCartCount( cartCount - 1 );
        // dispatch( { type: "remove", product: product })
    }

    return (
        <CartContext.Provider value={{cartItems, cartCount, addToCart, removeFromCart}}>{ props.children }</CartContext.Provider>
    )
}

export default GlobalCart;
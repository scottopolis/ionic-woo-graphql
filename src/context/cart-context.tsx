import React, { useState } from "react"

// interface ICart {
//     items: []
//     count: number
// }

// type ContextType = {
//     cart: ICart[]
//     addToCart: (items:any) => void
//     clearCart: () => void
// }

// the types for the cart
type CartState = { 
    items: []
    cartCount: 0
    addToCart: ( product ) => void
    removeFromCart: ( productId ) => void
}

// the default state for the cart, with a defined type
const defaultCart:CartState = { 
    items: [],
    cartCount: 0,
    addToCart: ( product ) => {},
    removeFromCart: ( productId ) => {}
}

const CartContext:React.Context<any> = React.createContext( defaultCart )

export default CartContext;
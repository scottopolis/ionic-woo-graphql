import { useMutation, gql } from "@apollo/client";
import React, { useContext } from 'react';
import { IonButton } from "@ionic/react";
import CartContext from '../context/cart-context'

const AddToCart: React.FC<any> = ( { product } ) => {

    const [ addToCartMutation ] = useMutation( ADD_TO_CART, {
        onCompleted: (data) => {
            console.log('complete', data)
        },
        onError: (err) => {
            console.log('error', err)
        }
    } );

    const {items, addToCart, removeFromCart} = useContext(CartContext);

    function handleAddToCart() {
        let id = product.databaseId;
        console.log( { input: { id, quantity: 1, clientMutationId: '123' } } );
        // add to cart on server
        addToCartMutation( { variables: { input: { productId: id, quantity: 1, clientMutationId: '123' } } } );
        // save locally dude
        addToCart( product )
    }

    return (
        <IonButton
        onClick={ () => handleAddToCart() }
        expand="block"
        >Add to Cart</IonButton>
    )
}

const ADD_TO_CART = gql`
  mutation ATC($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        subtotal
        total
        shippingTotal
        contents {
          itemCount
          nodes {
            product {
              node {
                name
                sku
                databaseId
                ... on SimpleProduct {
                  price
                }
              }
            }
          }
        }
      }
    }
  }
`

export default AddToCart;
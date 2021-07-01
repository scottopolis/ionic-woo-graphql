import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonBadge, IonIcon, useIonViewWillEnter, IonButton } from '@ionic/react';
import './Cart.css';
import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../context/cart-context';
import CheckoutButton from '../components/CheckoutButton';

const Cart: React.FC = () => {

  // const { items, cartCount, addToCart, removeFromCart } = useContext(CartContext);
  // console.log('cart', items);

  const {cartItems, addToCart, removeFromCart} = useContext(CartContext);
  var total = 0

  useIonViewWillEnter( () => {
    console.log('cart will enter')
  })

  cartItems.forEach( item => {
    total = total + parseInt( item.price.replace("$","") )
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cart</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
        { cartItems?.length ? cartItems.map( item => (
          <IonItem key={item.id}>
            <IonLabel><strong>{item.name}</strong></IonLabel>
            <IonBadge color="light">{ item.quantity ? item.quantity : 1 }</IonBadge>
            {/* <IonIcon icon={ removeCircle } slot="end" onClick={ () => removeFromCart(item) }>Remove</IonIcon> */}
          </IonItem>
          )) : ( <IonItem>No items to show.</IonItem>) }
        </IonList>
          <IonItem><IonLabel>Total: ${ total }</IonLabel></IonItem>
        <div className="ion-padding"><CheckoutButton /></div>
      </IonContent>
    </IonPage>
  );
};

export default Cart;

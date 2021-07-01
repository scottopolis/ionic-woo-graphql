import React, { useState } from 'react'
import { IonButton } from '@ionic/react';
import jwtDecode from 'jwt-decode'

const CheckoutButton:React.FC = () => {

    const session = useState( () => {

        const jwtSession = window.localStorage.getItem('woo-session');

        console.log('jwtSession', jwtSession)

        if( !jwtSession ) return null;

        try {

            const decoded = jwtDecode<{ data: { customer_id: string } }>(jwtSession);

            console.log('decoded', decoded)

            return decoded.data.customer_id;

        } catch( err ) {
            console.warn(err);
            return null;
        }
    } )

    const checkoutLink = () => {
        console.log(session)
        window.open(`https://test1.reactordev.com/checkout?session_id=${session[0]}`)
    }
    return(
        <IonButton onClick={ () => checkoutLink() } expand="block">Checkout</IonButton>
    )
}

export default CheckoutButton;
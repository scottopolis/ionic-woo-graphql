import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, IonCard, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonIcon, IonBadge, useIonViewWillEnter, IonList, IonLabel, IonItem } from '@ionic/react';
import { basket } from 'ionicons/icons';
import { useLocation, useParams } from 'react-router-dom';

import { RouteComponentProps } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../context/cart-context';
import AddToCart from '../components/AddToCart';
import RelatedProducts from '../components/RelatedProducts';

interface ProductDetailProps extends RouteComponentProps<{
  id: string;
}> {}

const ProductDetail: React.FC<ProductDetailProps> = ({ match, history } ) => {
  
  const {cartItems, cartCount, addToCart, removeFromCart} = useContext(CartContext);
  const [ text, setText ] = useState<string>();
  const location:any = useLocation();
  const [ product, setProduct ] = useState( location?.state?.product );

  useIonViewWillEnter( () => {
    if( !product ) {
      return null;
    }
  })

  return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
          <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>{ product?.name }</IonTitle>
            <IonButtons slot="end">
            <IonButton routerLink="/cart">
              <IonIcon icon={basket} />
              <IonBadge color="light" class="cart-badge">{cartCount ? cartCount : 0}</IonBadge>
            </IonButton>
          </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen class="ion-padding">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{ product?.name }</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div key={product?.id}>
          { product?.image && <div className="product-image-wrap"><img className="product-image" src={product?.image.sourceUrl} /></div> }

              <p className="price">{ product?.price }</p>
              <h2>{ product?.name }</h2>

            <div className="product-description" dangerouslySetInnerHTML={{ __html: product?.content }}></div>
            <AddToCart product={ product }></AddToCart>
            

          </div>

          <div style={{ marginTop: 20 }}>
              <IonList>
                <IonItem detail={true}>
                  <IonLabel>
                    Details
                  </IonLabel>
                </IonItem>
                <IonItem detail={true}>
                  <IonLabel>
                    Reviews
                  </IonLabel>
                </IonItem>
                <IonItem detail={true} lines="none">
                  <IonLabel>
                    Policies
                  </IonLabel>
                </IonItem>
              </IonList>
          </div>

          <h2>You might also like...</h2>
          <RelatedProducts id={ product.id } />
          
        </IonContent>
      </IonPage>
  );
};

interface Product {
  node: {
      id: string,
      databaseId: number,
      name: string,
      image: any,
      price: number,
      slug: string
  }
}

export default ProductDetail;
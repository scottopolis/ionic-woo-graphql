import { IonList, IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { Link, useHistory } from 'react-router-dom';
import './Product.css';

const ProductList = ( data:any ) => {

    const history = useHistory();
    const products = data.data;

    const go = product => {
        console.log(product)
        history.push('/products/' + product.databaseId, { product: product } );
    }

    return (
        <div className="product-list">
            { data && products.map( ( product:Product ) => (
                <IonCard key={product.node.id} onClick={ () => { go(product.node) }}>
                { product.node.image && <img src={product.node.image.sourceUrl} /> }
                <IonCardHeader>
                  <IonCardSubtitle class="price">{ product.node.price }</IonCardSubtitle>
                  <IonCardTitle>{ product.node.name }</IonCardTitle>
                </IonCardHeader>
              </IonCard>
            ))}
        </div>
    )
}

export default ProductList;

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
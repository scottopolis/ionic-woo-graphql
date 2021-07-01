import { IonCard, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader } from "@ionic/react";
import './Product.css';

const Product: React.FC<Props> = ( { product } ) => {

    console.log(product)

    if( !product ) return;

    return (
        <IonCard key={product.id}>
        { product.image && <div className="product-image-wrap"><img className="product-image" src={product.image.sourceUrl} /></div> }
        <IonCardHeader>
            <IonCardSubtitle class="price">{ product.price }</IonCardSubtitle>
            <IonCardTitle>{ product.name }</IonCardTitle>
        </IonCardHeader>
        </IonCard>
    )
}

export default Product;

interface Props {
    product: {
        id: string,
        name: string,
        image: any,
        price: number,
        slug: string
    }
}
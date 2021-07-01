import React from 'react';
import { IonSlides, IonSlide, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { Link, useHistory } from 'react-router-dom';
import './Product.css';
import { useQuery, gql } from '@apollo/client';

const RELATEDPRODUCTS = gql`
query getProduct($id: ID! ) {
  product(id: $id) {
    related {
      edges {
        node {
          id
          slug
          name
          type
          databaseId
          shortDescription
          image {
              id
              sourceUrl
              altText
          }
          galleryImages {
              nodes {
                  id
                  sourceUrl
                  altText
              }
          }
          ... on SimpleProduct {
              onSale
              price
              content
              regularPrice
          }
          ... on VariableProduct {
              onSale
              price
              content
              regularPrice
          }
        }
      }
    }
  }
}
`;

const RelatedProducts:React.FC<{ id: number | string }> = ( { id } ) => {
    console.log('related', id)
    const { data, loading, error } = useQuery( RELATEDPRODUCTS, { variables: { id: id } } );
    const history = useHistory();

    if( loading ) {
        return <></>;
    }

    if( error ) {
        console.warn(error);
    }

    const go = product => {
        console.log(product)
        history.push('/products/' + product.databaseId, { product: product } );
    }

    console.log(data)

    const products = data?.product?.related?.edges || [];

    return (
        <IonSlides className="related-products" pager={true}>
            { data && products.map( ( product ) => (
                <IonSlide key={product.node.id}>
                    <IonCard onClick={ () => { go(product.node) }}>
                    { product.node.image && <div className="related-image-wrap" style={{ backgroundImage: `url(${product.node.image.sourceUrl})` }}></div> }
                    <IonCardHeader>
                    <IonCardSubtitle class="price">{ product.node.price }</IonCardSubtitle>
                    <IonCardTitle>{ product.node.name }</IonCardTitle>
                    </IonCardHeader>
                </IonCard>
                </IonSlide>
            ))}
        </IonSlides>
    )
}

export default RelatedProducts;
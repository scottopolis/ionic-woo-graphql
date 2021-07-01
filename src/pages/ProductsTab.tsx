import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonSpinner, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import { useState } from 'react';
import './ProductsTab.css';
import ProductList from '../components/ProductList';

import { useQuery, gql } from '@apollo/client';

const PRODUCTS = gql`
query GetProducts($first: Int, $last: Int, $after: String, $before: String) {
  products(first: $first, last: $last, after: $after, before: $before) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      cursor
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
`;

const ProductTab: React.FC = () => {

  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);

  const variables = {
    first: 10,
    last: null,
    after: null,
    before: null
  };
  const { loading, error, data, fetchMore, refetch, networkStatus } = useQuery(PRODUCTS, { variables });

  if (loading) return <Loading />;

  if (error) {
    console.warn(error)
    return <p>Error</p>;
  }

  // Function to update the query with the new results
  const handleUpdateQuery = (previousResult: { products: { edges: any; }; }, { fetchMoreResult }: any) => {
    setDisableInfiniteScroll(true);
    if( !fetchMoreResult || !fetchMoreResult.products.edges.length ) return previousResult;
    fetchMoreResult.products.edges = [ ...previousResult.products.edges, ...fetchMoreResult.products.edges ]
    return fetchMoreResult;
  };

  const loadMore = () => {
    console.log('get more products')
    fetchMore({
      variables: {
        first: null,
        after: data?.products?.pageInfo?.endCursor || null,
        last: null,
        before: null
      },
      updateQuery: handleUpdateQuery
    });
  }

  const products = data?.products?.edges || [];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Products</IonTitle>
          </IonToolbar>
        </IonHeader>
        { products ? <ProductList data={products} /> : null }
        <IonInfiniteScroll 
        threshold="100px"
        disabled={disableInfiniteScroll} 
        onIonInfinite={loadMore}>
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default ProductTab;

const Loading = () => (
  <><IonHeader><IonToolbar></IonToolbar></IonHeader><IonContent class="center-content ion-padding"><IonSpinner></IonSpinner></IonContent></>
)
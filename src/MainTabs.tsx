import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { ellipse, basket, listOutline } from 'ionicons/icons';
import ProductsTab from './pages/ProductsTab';
import Tab2 from './pages/Tab2';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';

const MainTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/" to="/products" />
                <Route exact={true} path="/:tab(products)" render={() => <ProductsTab />} />
                <Route path="/:tab(products)/:id" component={ProductDetail} />
                <Route exact={true} path="/:tab(tab2)">
                <Tab2 />
                </Route>
                <Route path="/:tab(cart)" render={() => <Cart />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
            <IonTabButton tab="products" href="/products">
              <IonIcon icon={listOutline} />
              <IonLabel>Products</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={ellipse} />
              <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="cart" href="/cart">
              <IonIcon icon={basket} />
              <IonLabel>Cart</IonLabel>
            </IonTabButton>
          </IonTabBar>
      </IonTabs>
    )
}

export default MainTabs;
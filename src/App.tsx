import { Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import GlobalCart from './context/GlobalCart';
import MainTabs from './MainTabs'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { ApolloClient, InMemoryCache, from, ApolloLink, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const httpLink = new HttpLink({
  uri: 'https://test1.reactordev.com/graphql',
});

/**
 * Session handler - if we have a session token in localStorage, add it to the GraphQL request as a Session header.
 *
 * @ref https://github.com/wp-graphql/wp-graphql-woocommerce/pull/88
 */
 export const wooSessionMiddleware = new ApolloLink((operation, forward) => {
  // Don't run this while Gatsby is building. Window is not defined
  // @ref: https://www.gatsbyjs.org/docs/debugging-html-builds/
  if (typeof window === 'undefined') {
    return forward(operation)
  }

  /**
   * If session data exists in local storage, set value as session header.
   */
  const session = window.localStorage.getItem('woo-session')
  if (session) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        'woocommerce-session': `Session ${session}`,
      },
    }))
  }

  return forward(operation)
})

/**
 * Session handler - catch the incoming session token and store it in localStorage, for future GraphQL requests.
 *
 * @ref https://github.com/wp-graphql/wp-graphql-woocommerce/pull/88
 */
 export const wooSessionAfterware = new ApolloLink((operation, forward) => {
  // Don't run this while Gatsby is building. Window is not defined
  // @ref: https://www.gatsbyjs.org/docs/debugging-html-builds/
  if (typeof window === 'undefined') {
    return forward(operation)
  }

  return forward(operation).map(response => {
    const context = operation.getContext()

    const {
      response: { headers },
    } = context

    const session = headers.get('woocommerce-session')

    // Bail if no session was sent
    if (!session) {
      return response
    }

    // Bail if we already have the session
    if (window.localStorage.getItem('woo-session') === session) {
      return response
    }

    // Set WC session to localStorage
    window.localStorage.setItem('woo-session', session)

    return response
  })
})

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Cart: {
        keyFields: ['total'], // cart doesn't have an id, so per docs we need to track it somehow to make cache work as expected. This warning came up during coupons on the cart page
      },
    },
  }),
  link: from([wooSessionMiddleware, wooSessionAfterware, httpLink]),
})

const App: React.FC = () => {

  return (
    <IonApp>
      <ApolloProvider client={client}>
      <IonReactRouter>
        <GlobalCart>
          <IonRouterOutlet id="main">
            <Route path="/" render={()=> <MainTabs /> } />
          </IonRouterOutlet>
      </GlobalCart>
      </IonReactRouter>
      </ApolloProvider>
    </IonApp>
  )
  };

export default App;

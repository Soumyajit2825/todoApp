import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { firebase_auth } from '../firebaseConfig';

// const { user } = require('firebase-functions/v1/auth');

const httpLink = createHttpLink({
  // uri: 'http://172.23.76.65:8888/v1/graphql',
  uri: 'https://brief-fish-72.hasura.app/v1/graphql',
  useGETForQueries: false, 
});

const authLink = setContext(async (_, { headers }) => {
  const user = firebase_auth.currentUser;
  const token = user ? await user.getIdToken() : "";
  return {
    headers: {
      ...headers,
      'Authorization': token ? `Bearer ${token}` : "",
      // 'x-hasura-admin-secret': 'JIpjSSnTnmzEUoiRrmmQV3V4icHi4EHnp2jkZIA0U8o=',
      'x-hasura-admin-secret':'3Ti4Xbwaj8Unv46G1OCz7dIxIEbAK9b3sx7C9s27HYdZRMGbkk1J27wCoO6QQLc7',
      'x-hasura-allowed-roles': ['user','admin'],
      'x-hasura-user-id': user.uid,
      'x-hasura-default-role': 'admin',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
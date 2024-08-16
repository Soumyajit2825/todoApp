import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";


const httpLink = createHttpLink({
  uri: 'https://brief-fish-72.hasura.app/v1/graphql',
  useGETForQueries: false, 
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret': '3Ti4Xbwaj8Unv46G1OCz7dIxIEbAK9b3sx7C9s27HYdZRMGbkk1J27wCoO6QQLc7',
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
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://demo.vendure.io/shop-api', // Replace with your GraphQL endpoint
    credentials: 'include', // Use 'same-origin' or 'omit' if no cookies are involved
  }),
  cache: new InMemoryCache(),
});

export default client;

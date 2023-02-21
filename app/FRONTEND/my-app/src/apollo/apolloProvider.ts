import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';


export const client = new ApolloClient({
    uri : 'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
  })
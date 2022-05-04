import React from 'react'
import { AuthProvider } from './AuthProvider'
import Routes from './Route'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
    link: createHttpLink({ uri: 'http://ec2-44-192-88-13.compute-1.amazonaws.com/graphql' }),
    cache: new InMemoryCache()
});

const Provider = () => {
    return (
        <ApolloProvider client={client}>
         <AuthProvider>
           <Routes /> 
         </AuthProvider>
        </ApolloProvider>
    )
}

export default Provider

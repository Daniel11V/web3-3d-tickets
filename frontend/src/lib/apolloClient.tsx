"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import React from "react";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql", // tu backend local en Docker
  }),
  cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

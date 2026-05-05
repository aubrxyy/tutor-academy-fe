import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAuthToken } from "./session";

const graphqlUrl =
  import.meta.env.VITE_GRAPHQL_URL ??
  "https://api.tutoringacademy.czn.my.id/graphql";

const httpLink = new HttpLink({
  uri: graphqlUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = getAuthToken();

  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

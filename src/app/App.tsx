import { ApolloProvider } from "@apollo/client/react";
import { RouterProvider } from "react-router";
import { apolloClient } from "./api/graphql";
import { AuthProvider } from "./auth/AuthContext";
import { Toaster } from "./components/ui/sonner";
import { router } from "./routes";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;

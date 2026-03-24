import { RouterProvider } from "react-router";
import { AuthProvider } from "./auth/AuthContext";
import { Toaster } from "./components/ui/sonner";
import { router } from "./routes";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}

export default App;

import { RouterProvider } from "react-router-dom";
import "./App.css";
import AuthCheckLoading from "./components/shared/loaders/AuthCheckLoading";
import { useAuth } from "./contexts/AuthContext/AuthContext";
import { routes } from "./routes/Router";

function App() {
  const Router = routes;
  const { isLoading } = useAuth();
  return isLoading ? (
    <AuthCheckLoading></AuthCheckLoading>
  ) : (
    <div>
      <RouterProvider router={Router}></RouterProvider>
    </div>
  );
}

export default App;

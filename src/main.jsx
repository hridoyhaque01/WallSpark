import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext/AuthContext.jsx";
import { CategoryProvider } from "./contexts/CategoryContext/CategoryContext.jsx";
import { WallpaperProvider } from "./contexts/WallpaperContext/WallpaperContext.jsx";
import { TrendingProvider } from "./contexts/trendingContext/TrendingContext.jsx";
import "./index.css";
import("preline");
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <CategoryProvider>
      <WallpaperProvider>
        <TrendingProvider>
          <App />
        </TrendingProvider>
      </WallpaperProvider>
    </CategoryProvider>
  </AuthProvider>
  // </React.StrictMode>
);

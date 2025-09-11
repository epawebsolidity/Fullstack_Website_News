import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./router";
import "./index.css";
import { AuthProvider } from "@/context/AuthContext"; 
import { NewsProvider } from "@/context/NewsContext";
import { UsersProvider } from "@/context/UsersContext";

//import setupInterceptors from "@/utils/setupInterceptor";


//setupInterceptors();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
 <AuthProvider>
 <UsersProvider>
 <NewsProvider>
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  </NewsProvider>
  </UsersProvider>
  </AuthProvider>
);

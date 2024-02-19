import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/site/HomePage/Homepage";
import "./App.css";
import SiteLayout from "./pages/site/SiteLayout";
import Homepage from "./pages/site/HomePage/Homepage";
import ProductPage from "./pages/site/ProductPage/ProductPage";
import PricingPage from "./pages/site/PricingPage/PricingPage";
import LoginPage from "./pages/site/LoginPage/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/app/AppLayout";
import CityList from "./components/app/CityList/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/app/CountryList/CountryList";
import City from "./components/app/City/City";
import Form from "./components/app/Form/Form";
import { AuthContextProvider } from "./context/AuthContext";
import AuthGuard from "./pages/AuthGuard";
import { CitiesContextProvider } from "./context/CitiesContext";

const API_URL = "http://localhost:9000";

function App() {
  return (
    <AuthContextProvider>
      <CitiesContextProvider>
        <Routes>
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<Homepage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>

          <Route
            path="app"
            element={
              <AuthGuard>
                <AppLayout />
              </AuthGuard>
            }
          >
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CitiesContextProvider>
    </AuthContextProvider>
  );
}

export default App;

import SignPage from "./components/AuthPages/SignPage";
import React, { useEffect } from "react";
import { Route, Routes } from 'react-router-dom'
import WelcomePage from "./components/AuthPages/WelcomePage";
import HomePage from "./components/Pages/HomePage";
// import HeaderImplant from "./components/routerMiddlewares/HeaderImplant";
import PersistentLogin from "./components/AuthPages/Layouts/PersistentLogin";
import AuthorizedLayout from "./components/AuthPages/Layouts/AuthorizedLayout";
import requestAccessToken from "./hooks/refreshTokenApi";
import { addToAuth } from "./redux/slices/authSlice";
import { UseDispatch, useDispatch } from "react-redux";


export function App() {
  return (
    <React.Fragment>
      <Routes>
        {/* UnAuthorizedPages - Public Pages */}
        <Route path="/signup" element={<SignPage />}></Route>
        <Route path="/signin" element={<SignPage />}></Route>
        <Route path="/" element={<WelcomePage />}></Route>

        <Route element={<PersistentLogin />}>
          <Route element={<AuthorizedLayout />}>
            <Route element={<HomePage />} path="/homepage"></Route>
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  )
}

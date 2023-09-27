import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Tasks from "./pages/Tasks";
import Planets from "./pages/Planets";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./auth/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.min.css";
import { getLocalStorageAuth } from "./utils/local-storage";

function App() {
  const [isUserAuthenticated] = useState(!!getLocalStorageAuth());

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute isAllowed={!isUserAuthenticated} redirectTo="/tasks">
              <Login />
            </ProtectedRoute>

          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute isAllowed={isUserAuthenticated} redirectTo="/login">
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/planets"
          element={
            <ProtectedRoute isAllowed={isUserAuthenticated} redirectTo="/login">
              <Planets />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

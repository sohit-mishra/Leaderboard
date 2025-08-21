import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import ClaimHistory from "@/pages/ClaimHistory";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import PageNotFound from "@/pages/PageNotFound";
import PrivateRouter from "@/router/Private";
import Navbar from "@/components/Navbar";

const AllRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />


      <Route element={<PrivateRouter />}>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/history/:id"
          element={
            <>
              <Navbar />
              <ClaimHistory />
            </>
          }
        />
      </Route>

    
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRouter;

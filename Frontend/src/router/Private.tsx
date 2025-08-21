import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Private: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen">Checking session...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Private;

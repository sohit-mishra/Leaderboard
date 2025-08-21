import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page Not Found</p>
      <Button onClick={goHome} className="bg-blue-600 hover:bg-blue-700 text-white">
        Go Home
      </Button>
    </div>
  );
};

export default PageNotFound;

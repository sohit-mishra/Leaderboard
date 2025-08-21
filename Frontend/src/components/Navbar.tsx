import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoSrc from "@/assets/logo.svg";
import { useAuth } from "@/context/AuthContext";

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user");
        const data: User = await res.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Logo + App Name */}
      <div className="flex items-center space-x-3">
        <img src={logoSrc} alt="Logo" className="h-10 w-10 object-contain" />
        <span className="text-xl font-bold text-gray-800">Leader Board</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center space-x-4">
        {userData && (
          <div className="flex items-center space-x-2">
            {userData.avatarUrl && (
              <img
                src={userData.avatarUrl}
                alt={userData.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            )}
            <span className="text-gray-700 font-medium">{userData.name}</span>
          </div>
        )}
        <Link
          to="/profile"
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          Profile
        </Link>
        <Button
          variant="outline"
          onClick={() => {
            logout();
            setUserData(null);
          }}
        >
          Logout
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 flex flex-col space-y-2 sm:hidden">
          {userData && (
            <div className="flex items-center space-x-2">
              {userData.avatarUrl && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${userData.avatarUrl}`}
                  alt={userData.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <span className="text-gray-700 font-medium">{userData.name}</span>
            </div>
          )}
          <Link
            to="/profile"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Profile
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              logout();
              setUserData(null);
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

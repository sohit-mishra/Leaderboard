import React, { useState } from "react";
import type { FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; 
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      if (res.status === 200) {
        const { _id, name, token } = res.data;

        login({ id: _id, name, email }, token);

        if (remember) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || "Login failed";
        setError(msg);
        toast.error(msg);
      } else {
        setError("Unexpected error occurred");
        toast.error("Unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="mb-2">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="password" className="mb-2">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(!!checked)}
                />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {error && <p className="text-red-500 text-sm"></p>}

            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </form>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;

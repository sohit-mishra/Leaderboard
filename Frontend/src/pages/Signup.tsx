import React, { useState, type FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import axios from "axios";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill all fields");
      toast.error("Please fill all fields");
      return;
    }

    const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error("Signup failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm"></p>}

            <Button type="submit" className="w-full mt-2">
              Sign Up
            </Button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;

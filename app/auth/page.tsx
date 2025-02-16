// @ts-nocheck
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  UserCheck,
  Shield,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const response = await axios.post(endpoint, data, {
        withCredentials: true,
      });

      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        setSuccess("Login successful!");
        router.push("/");
      } else {
        setSuccess("Account created successfully!");
        router.push("/");
      }
    } catch (err: any) {
      console.error(err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center p-4">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left side - Benefits */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {isLogin ? "Welcome Back!" : "Join Our Community"}
              </h1>
              <p className="text-lg text-gray-600">
                {isLogin
                  ? "Access your personalized dashboard and manage your services"
                  : "Create an account to discover and book amazing services"}
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur rounded-lg shadow-sm">
                <div className="p-3 bg-blue-100 rounded-full">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Easy Booking</h3>
                  <p className="text-gray-600">
                    Book services with just a few clicks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur rounded-lg shadow-sm">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Secure Platform
                  </h3>
                  <p className="text-gray-600">Your data is always protected</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur rounded-lg shadow-sm">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Verified Providers
                  </h3>
                  <p className="text-gray-600">
                    Access trusted service professionals
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div>
            <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/90">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {isLogin ? "Sign In to Your Account" : "Create Your Account"}
                </CardTitle>
                <CardDescription className="text-center">
                  {isLogin
                    ? "Access your personalized dashboard"
                    : "Join us to get started with our services"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="John Doe"
                          className="w-full bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+91 9999999999"
                          className="w-full bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          required
                          placeholder="123 Main St, City, State"
                          className="w-full bg-white"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full bg-white"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
                      <AlertCircle size={18} />
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded">
                      <CheckCircle2 size={18} />
                      <span>{success}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    disabled={loading}
                  >
                    {loading
                      ? "Please wait..."
                      : isLogin
                      ? "Sign In"
                      : "Create Account"}
                  </Button>

                  <div className="space-y-2 text-center">
                    <div className="text-sm text-blue-600 hover:underline">
                      <Link href="/provider/auth">Join as Provider</Link>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {isLogin
                        ? "Don't have an account? Sign up"
                        : "Already have an account? Sign in"}
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

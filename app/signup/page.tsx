"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/custom/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { OtpPopup } from "@/components/custom/OtpPopup";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  EyeIcon,
  EyeOffIcon,
  User,
  Phone,
  Mail,
  Lock,
  UserCircle,
} from "lucide-react";
import Link from "next/link";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpType, setOtpType] = useState<"phone" | "email" | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [lastVerifiedPhone, setLastVerifiedPhone] = useState("");
  const [lastVerifiedEmail, setLastVerifiedEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Reset verification if phone or email changes after verification
    if (name === "phone" && isPhoneVerified && value !== lastVerifiedPhone) {
      setIsPhoneVerified(false);
      setLastVerifiedPhone("");
    }

    if (name === "email" && isEmailVerified && value !== lastVerifiedEmail) {
      setIsEmailVerified(false);
      setLastVerifiedEmail("");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (value.length < 5) error = "Name must be at least 5 characters long";
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) error = "Phone number must be 10 digits";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case "password":
        if (value.length < 8)
          error = "Password must be at least 8 characters long";
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)) {
          error =
            "Password must contain uppercase, lowercase, number, and special character";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "Passwords do not match";
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  useEffect(() => {
    const strength = calculatePasswordStrength(formData.password);
    setPasswordStrength(strength);
  }, [formData.password]);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
    return strength;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the form data object to be sent to the API
    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };
    console.log("Form submitted:", data);

    try {
      const response = await fetch("http://192.168.1.16:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      });
      if (response.ok) {
        const result = await response.json();
        console.log("API Response:", result); // Log the response from the API
        alert(result.message); // Alert the user of success
      } else {
        const error = await response.json();
        console.error("Error:", error);
        alert("Error: " + error.detail);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error occurred.");
    }
  };

  const handleGetOtp = (type: "phone" | "email") => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`OTP for ${type}: ${otp}`);
    setOtpType(type);
  };

  const handleVerifyOtp = (otp: string) => {
    console.log(`Verifying OTP for ${otpType}:`, otp);
    if (otpType === "phone") {
      setIsPhoneVerified(true);
      setLastVerifiedPhone(formData.phone);
    }
    if (otpType === "email") {
      setIsEmailVerified(true);
      setLastVerifiedEmail(formData.email);
    }
    setOtpType(null);
  };

  const handleResendOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Resending OTP for ${otpType}: ${otp}`);
  };

  return (
    <Layout>
      <div className="bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-24 pt-16">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="space-y-3 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill in your details to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 h-11"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 h-11"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleGetOtp("phone")}
                    disabled={
                      !!errors.phone ||
                      isPhoneVerified ||
                      formData.phone.length === 0
                    }
                    className={`h-11 ${
                      isPhoneVerified ? "bg-green-600 hover:bg-green-700" : ""
                    }`}
                  >
                    {isPhoneVerified ? "Verified ✓" : "Get OTP"}
                  </Button>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 h-11"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleGetOtp("email")}
                    disabled={
                      !!errors.email ||
                      isEmailVerified ||
                      formData.email.length === 0
                    }
                    className={`h-11 ${
                      isEmailVerified ? "bg-green-600 hover:bg-green-700" : ""
                    }`}
                  >
                    {isEmailVerified ? "Verified ✓" : "Get OTP"}
                  </Button>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Rest of the component remains the same... */}
              {/* Password, Confirm Password, Submit button sections are unchanged */}

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 h-11"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">
                    Password Strength
                  </Label>
                  <Progress
                    value={passwordStrength}
                    className="h-2"
                    style={{
                      background: "#e5e7eb",
                      color:
                        passwordStrength >= 75
                          ? "#22c55e"
                          : passwordStrength >= 50
                          ? "#eab308"
                          : passwordStrength >= 25
                          ? "#f97316"
                          : "#ef4444",
                    }}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 h-11"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 border-t pt-6">
            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={
                !isPhoneVerified ||
                !isEmailVerified ||
                Object.values(errors).some((error) => error !== "") ||
                formData.password !== formData.confirmPassword
              }
              onClick={handleSubmit}
            >
              Create Account
            </Button>
            <div className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>

        <OtpPopup
          isOpen={otpType !== null}
          onClose={() => setOtpType(null)}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          type={otpType || "phone"}
        />
      </div>
    </Layout>
  );
}

export default Signup;

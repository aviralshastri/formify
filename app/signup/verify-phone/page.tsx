"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { ArrowLeft } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import toast, { Toaster } from 'react-hot-toast';
import Layout from "@/components/custom/Layout";

export default function VerifyPhone() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ phoneNumber: '', name: '' });

  // Refs for animations
  const formRef = useRef(null);
  const headerRef = useRef(null);
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const storedDetails = sessionStorage.getItem('userDetails');
    if (storedDetails) {
      setUserDetails(JSON.parse(storedDetails));
    }
    sendOTP();
  }, []);

  const sendOTP = async () => {
    setLoading(true);
    try {
      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      const response = await fetch('http://192.168.1.8:8000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          otp: generatedOTP,
          type: 'phone',
          name: userDetails.name,
          phoneNumber: userDetails.phoneNumber,
        }),
      });

      if (response.ok) {
        toast.success('OTP sent successfully');
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      toast.error('Error sending OTP');
    }
    setLoading(false);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const verifyOTP = async () => {
    const enteredOTP = otp.join('');
    if (enteredOTP.length === 6) {
      try {
        const response = await fetch('http://192.168.1.8:8000/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber: userDetails.phoneNumber,
            otp: enteredOTP
          })
        });

        if (response.ok) {
          toast.success('OTP verified successfully');
          router.push('/dashboard');
        } else {
          toast.error('Invalid OTP. Please try again.');
        }
      } catch (error) {
        toast.error('Verification failed. Please try again.');
      }
    } else {
      toast.error('Please enter a valid 6-digit OTP');
    }
  };

  const maskedPhone = userDetails.phoneNumber.replace(/.(?=.{4})/g, '*');

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={formInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-24 pt-16"
      >
      <Toaster position="top-center" reverseOrder={false} />

        <Card className="w-full max-w-lg shadow-xl overflow-hidden">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <CardHeader className="space-y-3 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={headerInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <CardTitle className="text-3xl font-bold tracking-tight">
                  Verify Your Phone Number
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={headerInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <CardDescription className="text-gray-600">
                  Enter the 6-digit code sent to {maskedPhone}
                </CardDescription>
              </motion.div>
            </CardHeader>
          </motion.div>

          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <CardContent className="pt-6">
              <div className="space-y-6">
                <motion.div
                  className="flex justify-between"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={formInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-2xl"
                    />
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Button 
                    onClick={verifyOTP} 
                    className="w-full h-11 text-base"
                    disabled={loading || otp.join('').length !== 6}
                  >
                    Verify OTP
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={formInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center text-sm text-gray-600"
                >
                  Didn't receive the code?{' '}
                  <Button 
                    variant="link" 
                    onClick={sendOTP}
                    disabled={loading}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Resend OTP
                  </Button>
                </motion.div>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-6 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={formInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="w-full"
              >
                <Button 
                  variant="ghost" 
                  onClick={() => router.push('/signup')}
                  className="w-full text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Signup
                </Button>
              </motion.div>
            </CardFooter>
          </motion.div>
        </Card>
      </motion.div>
  );
}
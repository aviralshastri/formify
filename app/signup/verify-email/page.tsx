"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OtpVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [emailMasked, setEmailMasked] = useState('');
  const [error, setError] = useState('');

  // Getting session data
  useEffect(() => {
    const sessionData = JSON.parse(sessionStorage.getItem("userDetails"));
    if (!sessionData) {
      router.push("/signup"); // If no data in session, redirect to signup page
      return;
    }

    const email = sessionData.email.value;
    // Masking email for security
    const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1**$3');
    setEmailMasked(maskedEmail);
  }, [router]);

  // Function to generate a random OTP
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    return otp;
  };

  // Sending OTP to the user's email
  const sendOtp = async (otp) => {
    const sessionData = JSON.parse(sessionStorage.getItem("formData"));
    const email = sessionData.email.value;
    const name = sessionData.name;

    try {
      const response = await fetch("http://localhost:8000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
          type: "email",
          name,
          email,
        }),
      });

      if (response.ok) {
        setOtpSent(true);
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = (event) => {
    event.preventDefault();

    if (otp === "") {
      setError("Please enter the OTP.");
      return;
    }

    // Logic to verify the OTP (on success, handle next steps)
    alert("OTP Verified!");
  };

  // Handle OTP generation and sending on page load
  const handleSendOtp = () => {
    const generatedOtp = generateOtp();
    setOtp(generatedOtp);
    sendOtp(generatedOtp);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>OTP Verification</h2>
      {emailMasked && (
        <p>Sending OTP to {emailMasked}...</p>
      )}
      <div>
        {!otpSent ? (
          <button onClick={handleSendOtp}>Send OTP</button>
        ) : (
          <div>
            <form onSubmit={handleOtpSubmit}>
              <label htmlFor="otp">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit">Verify OTP</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        )}
      </div>
      <button
        onClick={() => router.push("/signup")}
        style={{ marginTop: "20px" }}
      >
        Back to Sign Up
      </button>
    </div>
  );
}

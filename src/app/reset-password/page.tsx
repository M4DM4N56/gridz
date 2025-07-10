"use client";
import "../../css/login.css";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPasswordResetCode, confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function PasswordResetPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const oobCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [stage, setStage] = useState<"email" | "newPassword" | "done" | "error">("email");
  const [newPassword, setNewPassword] = useState("");

  // by default, set to "new password" mode to prompt for email
  useEffect(() => {
    if (mode === "resetPassword" && oobCode) {
      // switch to reset password mode by default
      setStage("newPassword");

      // this line was ripped form stackoverflow
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => setEmail(email))
        .catch(() => setStage("error"));
    }
  }, [oobCode, mode]);


  // when code email is sent, show this page
  const handleSendResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setStage("done");
    } 
    catch (err: any) {
      setError(err.message);
    }
  };


  // when link from email is opened, prompt for new password
  const handleConfirmReset = async () => {
    try {
      await confirmPasswordReset(auth, oobCode!, newPassword);
      setStage("done");
      // automatically bring them back to the login page
      router.push("/");
    } 
    catch (err: any) {
      setError(err.message);
    }
  };

  
  if (stage === "newPassword") {
    return <>
      <div className="auth-page">

        <div className="auth-left">
          <h1 className="logo">gridz</h1>
          <p className="tagline">Reset your password</p>
        </div>

        <div className="auth-right">
          <p>Email: {email}</p>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button className="auth-button" onClick={handleConfirmReset}>Submit</button>
          {error && <p className="error">{error}</p>}
        </div>
        
      </div>
    </>
  }

  if (stage === "email") {
    return <>
      <div className="auth-page">
        <div className="auth-left">
          <h1 className="logo">gridz</h1>
          <p className="tagline">Request Password Reset</p>
        </div>

        <div className="auth-right">
          <input
            className="auth-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="auth-button" onClick={handleSendResetEmail}>Send Reset Email</button>
          {error && <p className="error">{error}</p>}
        </div>

      </div>
    </>
  }

  if (stage === "done") {
    return <>
      <div className="auth-page">

        <div className="auth-left">
          <h1 className="logo">gridz</h1>
          <p className="tagline">Success!</p>
        </div>

        <div className="auth-right">
          <p>Success! Please check your email or try signing in again.</p>
        </div>
      </div>
    </>
  }

  // if something somehow went wrong, give generic error page
  return <>

    <div className="auth-page">
      
      <div className="auth-left">
        <h1 className="logo">gridz</h1>
        <p className="tagline">Oops!</p>
      </div>

      <div className="auth-right">
        <p>Something went wrong. Please try again.</p>
      </div>

    </div>
      
  </>
}
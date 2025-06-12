"use client";

import "../css/globals.css";
import "../css/login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase"; // adjust this path if needed


export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // email/password login
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/account"); // redirect on success
    } 
    catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  // google sign-in
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/account"); // redirect on success
    } 
    catch (error: any) {
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <h1 className="logo">gridz</h1>

      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleEmailLogin}>Log In</button>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}

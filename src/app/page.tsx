"use client";

import "../css/login.css";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useUser } from "../contexts/userContext";

export default function HomePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [wrongPasswordAttempted, setWrongPasswordAttempted] = useState(false);
  const [error, setError] = useState("");

  const { user, loading } = useUser();

  // automatically redirect user if user exists with username
  useEffect(() => {
    if (!loading && user?.displayName) {
      router.replace("/account");
    }
  }, [user, loading, router]);

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please enter both an email and a password.");
      return;
    }

    // clear error
    setError("");

    try {
      // attempt sign in
      await signInWithEmailAndPassword(auth, email, password);
    } 
    catch (loginError: any) {
      if ( // if no user with that email or wrong email/password pair:
        loginError.code === "auth/user-not-found" ||
        loginError.code === "auth/invalid-credential"
      ) {
        try {
          // first try creating user
          await createUserWithEmailAndPassword(auth, email, password);
        } 
        catch (signupError: any) {
          // if password already in use: set the flag
          if (signupError.code === "auth/email-already-in-use") {
            setError("Wrong password. Try again.");
            setWrongPasswordAttempted(true);
          } 
          else if (signupError.code === "auth/invalid-email") {
            setError("Please enter a valid email.");
          } 
          else {
            setError("Could not create account. " + signupError.message);
          }
        }
      }
      // catch other possible error 
      else if (loginError.code === "auth/invalid-email") {
        setError("Please enter a valid email.");
      } 
      // if wrong password to existing account, set flag
      else if (loginError.code === "auth/wrong-password") {
        setError("Wrong password. Try again.");
        setWrongPasswordAttempted(true);
      } 
      else {
        setError("Login failed: " + loginError.message);
      }
    }
  };

  const handleUsernameSubmit = async () => {
    // eliminate spaces from ends
    const cleanUsername = username.trim();

    if (!cleanUsername) {
      setError("Please enter a valid username");
      return;
    }

    if (!auth.currentUser) {
      setError("No user found.");
      return;
    }

    // given new username, manually update user profile
    try {
      await updateProfile(auth.currentUser, { displayName: cleanUsername });
      router.push("/account");
    } 
    catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return null;

  // create flag for username prompting
  const shouldShowUsernamePrompt = user && !user.displayName;

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1 className="logo">gridz</h1>
        <p className="tagline">Create grids and show off your taste!</p>
      </div>

      <div className="auth-right">
        {shouldShowUsernamePrompt ? (
          <>
            <div className="username-container">
              <p>Welcome! Let's create your username</p>
              <form onSubmit={(e) => { e.preventDefault(); handleUsernameSubmit(); }}>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button className="auth-button" type="submit">Submit Username</button>
              </form>
            </div>
          </>
        ) : (
          <>
            <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
              <input
                className="auth-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="auth-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="auth-button" type="submit">Submit</button>
            </form>
          </>
        )}

        {wrongPasswordAttempted && (
          <button
            className="auth-button"
            onClick={() => router.push("/reset-password")}
          >
            Forgot Password?
          </button>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

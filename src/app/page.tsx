// page.tsx
"use client";

import "../css/login.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";


export default function HomePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isNewUser, setIsNewUser] = useState(false);

  const [wrongPasswordAttempted, setWrongPasswordAttempted] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please enter both an email and a password.");
      return;
    }

    // clear previous error
    setError("");
    
    try { // try sign in with auth, email/password pair
      const loginResult = await signInWithEmailAndPassword(auth, email, password);
      router.push("/account");
    } 
    
    catch (loginError: any) {

      if ( // if invalid credentials are given:
        loginError.code === "auth/user-not-found" ||
        loginError.code === "auth/invalid-credential"
      ) {
        try { // try creating a new user with auth, email/password pair
          const signupResult = await createUserWithEmailAndPassword(auth, email, password);
          setIsNewUser(true);
        } 
        catch (signupError: any) { // upon some sign up error,
          if ( signupError.code === "auth/email-already-in-use") {
            setError("Wrong password. Try again.");
            setWrongPasswordAttempted(true);
          } 
          else if ( signupError.code === "auth/invalid-email") { setError("Please enter a valid email."); } 
          else    { setError("Could not create account. " + signupError.message); }
        }
      } 

      // catch some common errors
      else if (loginError.code === "auth/invalid-email")  { setError("Please enter a valid email.");} 
      else if (loginError.code === "auth/wrong-password") {
        setError("Wrong password. Try again.");
        setWrongPasswordAttempted(true);
      }
      else { setError("Login failed: " + loginError.message); }
    }
  };

  const handleUsernameSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, { displayName: username });
        router.push("/account");
      } 
      catch (err: any) {
        setError(err.message);
      }
    }
  };

  return <>

    <div className="auth-page">
      <div className="auth-left">
        <h1 className="logo">gridz</h1>
        <p className="tagline">Create grids and show off your taste!</p>
      </div>

      <div className="auth-right">
        {!isNewUser ? (
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
        ) : (
          <>
            <div className="username-container">
              <p>Welcome new user! Let's create your username</p>
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
        )}

        {wrongPasswordAttempted && (
          <button className="auth-button" onClick={() => router.push("/reset-password")}>
            Forgot Password?
          </button>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>

  </>
}

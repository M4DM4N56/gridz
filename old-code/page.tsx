"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [isSignupMode, setIsSignupMode] = useState(false);

  // upon load, check if loggedInUser exists
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    // if exists, log user in, username = saved user
    if (savedUser) {
      setUsername(savedUser);
      setLoggedIn(true);
    }
  }, []);


  // reitrieves all saved users
  const getUsers = (): Record<string, string> => {
    const usersJSON = localStorage.getItem("users");

    if (usersJSON) { return JSON.parse(usersJSON); }
    return {};
  };


  // saves given user record to storage with the other users
  const saveUsers = (users: Record<string, string>) => {
    localStorage.setItem("users", JSON.stringify(users));
  };


  const handleLogin = () => {
    const users = getUsers();

    // if username exists and password matches, login user and set loggedInUser to storage
    if (users[username] && users[username] === password) {
      setLoggedIn(true);
      localStorage.setItem("loggedInUser", username);
      setError("");
    } 
    
    else { setError("Invalid username or password"); }
  };


  const handleSignup = () => {
    const users = getUsers();

    // if username already exists, throw error
    if (users[username]) { setError("Username already exists"); } 
    
    // else create+save user/pass record, log in user
    else {
      users[username] = password;
      saveUsers(users);
      localStorage.setItem("loggedInUser", username);
      setLoggedIn(true);
      setError("");
    }
  };


  const handleLogout = () => {
    // remove the logInUser from storage, clear user/pass record
    localStorage.removeItem("loggedInUser");
    setUsername("");
    setPassword("");
    setLoggedIn(false);
  };


  return (
    <html lang="en">
      <body>
        <h1>My Site</h1>

        {!loggedIn ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isSignupMode ? handleSignup() : handleLogin();
            }}
          >
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            <br />

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <br />

            <button type="submit">{isSignupMode ? "Sign up" : "Log in"}</button>
            <button
              type="button"
              onClick={() => {
                setIsSignupMode(!isSignupMode);
                setError("");
              }}
            >
              {isSignupMode ? "Switch to Log in" : "Switch to Sign up"}
            </button>

            {error && (
              <p style={{ color: "red" }}>{error}</p>
            )}
          </form>
        ) : (
          <div>
            <p>
              Welcome back, <strong>{username}</strong>!
            </p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </body>
    </html>
  );
}

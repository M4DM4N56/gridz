"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // load login data upon visit
  useEffect(() => {
    // if local browser storage holds a saved username and password
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");
    
    // set the username and password, log in user
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setLoggedIn(true);
    }
  }, []);

  
  const handleLogin = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
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
              handleLogin();
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

            <button type="submit">Log in</button>
            <button type="button" onClick={() => alert("Signup not implemented")}>
              Sign up
            </button>
          </form>
        ) : (
          <div>
            <p>Welcome back, <strong>{username}</strong>!</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </body>
    </html>
  );
}

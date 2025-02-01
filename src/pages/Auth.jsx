// src/Auth.js
import React, { useState } from "react";
import { auth } from "../App";
import { signInWithPopup, GoogleAuthProvider, signInAnonymously, signOut } from "firebase/auth";

function Auth() {
  const [user, setUser] = useState(null);

  // Google sign-in
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error with Google sign-in:", error.message);
    }
  };

  // Anonymous sign-in
  const handleAnonymousSignIn = async () => {
    try {
      const result = await signInAnonymously(auth);
      setUser(result.user);
    } catch (error) {
      console.error("Error with Anonymous sign-in:", error.message);
    }
  };

  // Sign-out function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div>
      <h2>Firebase Auth with Google and Anonymous</h2>
      {user ? (
        <div>
          <h3>Welcome, {user.isAnonymous ? "Anonymous User" : user.displayName}</h3>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <button onClick={handleGoogleSignIn}>Sign In with Google</button>
          <button onClick={handleAnonymousSignIn}>Sign In Anonymously</button>
        </div>
      )}
    </div>
  );
}

export default Auth;

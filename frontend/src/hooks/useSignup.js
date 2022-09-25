import { useState } from "react";

import { useAuthContext } from "./useAuthtContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);

      return;
    }

    // save the user to local storage
    localStorage.setItem("user", JSON.stringify(json));

    // update the auth context
    dispatch({ type: "LOGIN", payload: json });

    setIsLoading(false);
  };
  return { isLoading, error, signup };
};

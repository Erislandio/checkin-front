import React, { createContext, useState, useEffect } from "react";
import { Logo } from "../../assets/icons";

export const UserContext = createContext();

export const withUserData = Component => props => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
      setLoading(false);
    }
  }, []);

  if (loading || !user) {
    return (
      <div className="splash">
        <Logo />
        <h2>Checkin</h2>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...props} user={user} />
    </UserContext.Provider>
  );
};

import React, { useState, useEffect } from "react";
import { Logo } from "../../assets/icons";

export const withUserData = Component => props => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="splash">
        <Logo />
        <h2>Checkin</h2>
      </div>
    );
  }

  return <Component {...props} user={user} setUser={setUser} />;
};

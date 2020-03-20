import React, { useState, useEffect } from "react";
import { Logo } from "../../assets/icons";
import { api } from "../services/api";

export const withUserData = Component => props => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const cookie = JSON.parse(user);
      api
        .get("/user", {
          params: {
            email: cookie.user.email
          },
          headers: {
            Authorization: `Bearer ${cookie.token}`
          }
        })
        .then(({ data }) => {
          setUser({
            ...data,
            token: cookie.token
          });
        })
        .catch(() => {
          setUser({
            ...cookie
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
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

import React, { useState, useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Logo } from "../../../assets/icons";
import { useToasts } from "react-toast-notifications";
import { api } from "../../services/api";
import {
  FormDefaultWrapper,
  InputDefault,
  ButtonDefault
} from "../../atoms/formDefault";

export default function LoginScreen({ history }) {
  const { addToast } = useToasts();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [isLoading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      api
        .post("/login", {
          email: user.email,
          password: user.password
        })
        .then(({ data }) => {
          if (data.code) {
            addToast(data.error.message, {
              appearance: "error"
            });
          }
          localStorage.setItem("user", JSON.stringify(data));
          history.push("/home");
        })
        .catch(error => {
          addToast(
            "Ops! não foi possível acessar o app no momento,  tente novamente mais tarde",
            {
              appearance: "error"
            }
          );
        })
        .finally(() => {
          setLoading(false);
        });

      setLoading(false);
    } catch (error) {
      addToast(
        "Ops! não foi possível acessar o app no momento,  tente novamente mais tarde",
        {
          appearance: "error"
        }
      );
    }
  };

  return (
    <section id="login">
      <main className="container">
        <header>
          <Logo />
          <h3>Checkin</h3>
        </header>

        <FormDefaultWrapper onSubmit={handleSubmit}>
          <h3> Login</h3>
          <InputDefault
            required
            title="Email"
            placeholder="Email"
            type="email"
            value={user.email}
            onChange={handleChange}
            name="email"
          />
          <InputDefault
            required
            title="Senha"
            placeholder="Senha"
            type="password"
            onChange={handleChange}
            value={user.password}
            name="password"
          />
          <ButtonDefault
            title="Criar"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          />
          <Link to="/signin">
            Não tem uma <span style={{ color: "#c599c6" }}>Conta</span>?
          </Link>
        </FormDefaultWrapper>
      </main>
    </section>
  );
}

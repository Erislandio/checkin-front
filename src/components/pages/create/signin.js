import React, { useState, useEffect } from "react";
import "./signin.css";
import { Link } from "react-router-dom";
import {
  FormDefaultWrapper,
  InputDefault,
  ButtonDefault
} from "../../atoms/formDefault";
import { useToasts } from "react-toast-notifications";
import { api } from "../../services/api";

export default function SignInScreen({ history }) {
  const { addToast } = useToasts();

  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    longitude: 0,
    latitude: 0
  });

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {
        coords: { longitude, latitude }
      } = position;

      setUser({ ...user, longitude, latitude });
    });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/user", {
        ...user
      });

      if (data.error) {
        return addToast(data.error.message, {
          appearance: "error"
        });
      }

      if (data) {
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
      }

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

  const handleChange = e => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value
    });
  };

  return (
    <section id="login">
      <main className="container">
        <header>
          <img src="https://img.icons8.com/cotton/64/000000/test-tube.png" />
          <h3>Checkin</h3>
        </header>
        <FormDefaultWrapper onSubmit={handleSubmit}>
          <h3>Nova conta</h3>
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
            title="Nome"
            placeholder="Nome"
            type="text"
            onChange={handleChange}
            value={user.name}
            name="name"
          />
          <InputDefault
            required
            title="Sobrenome"
            placeholder="Sobrenome"
            type="text"
            onChange={handleChange}
            value={user.lastname}
            name="lastname"
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
          <Link to="/">
            Já tem uma <span style={{ color: "#c599c6" }}>Conta</span>?
          </Link>
        </FormDefaultWrapper>
      </main>
    </section>
  );
}

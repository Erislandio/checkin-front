import React from "react";
import "./signin.css";
import { Link } from "react-router-dom";
import {
  FormDefaultWrapper,
  InputDefault,
  ButtonDefault
} from "../../atoms/formDefault";

export default function SignInScreen() {
  const handleSubmit = e => {
    e.preventDefault();
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
          <InputDefault title="Email" placeholder="Email" />
          <InputDefault title="Nome" placeholder="Nome" />
          <InputDefault title="Sobrenome" placeholder="Sobrenome" />
          <InputDefault title="Senha" placeholder="Senha" />
          <ButtonDefault title="Criar" />
          <Link to="/">
            Já tem uma <span style={{ color: "#c599c6" }}>Conta</span>?
          </Link>
        </FormDefaultWrapper>
      </main>
    </section>
  );
}

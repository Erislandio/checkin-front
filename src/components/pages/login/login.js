import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

export default function LoginScreen() {
  return (
    <section id="login">
      <main className="container">
        <header>
          <img src="https://img.icons8.com/cotton/64/000000/test-tube.png" />
          <h3>Checkin</h3>
        </header>
        <form id="login-form" className="default-form">
          <h3>Login</h3>
          <div className="default-input">
            <label>email</label>
            <input type="email" placeholder="email" />
          </div>
          <div className="default-input">
            <label>senha</label>
            <input type="password" placeholder="senha" />
          </div>
          <div className="default-button">
            <button>Entrar</button>
          </div>
          <Link to="/signin">
            Não tem uma <span style={{ color: "#c599c6" }}>Conta</span>?
          </Link>
        </form>
      </main>
    </section>
  );
}

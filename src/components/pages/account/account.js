import React, { useState, useContext } from "react";
import { withUserData } from "../../atoms/withUserData";
import "./account.css";
import Switch from "react-switch";
import { Logo } from "../../../assets/icons";
import {
  InputDefault,
  FormDefaultWrapper,
  ButtonDefault
} from "../../atoms/formDefault";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { UserContext } from "../../Index";
import { api } from "../../services/api";

function Account() {
  const {
    user: {
      user,
      user: { address: userAddress, symptom }
    }
  } = useContext(UserContext);

  const [checked, setChecked] = useState(symptom);
  const [address, setAddress] = useState(userAddress);

  const options = {
    title: "Alerta",
    message: "Tem certeza que quer sair do app?",
    buttons: [
      {
        label: "Sim",
        onClick: () => handleExit()
      },
      {
        label: "Não",
        onClick: () => {}
      }
    ],
    closeOnEscape: false,
    closeOnClickOutside: false
  };

  const handleCheckOption = () => {
    setChecked(!checked);
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    api.patch

  };

  const handleChange = e => {
    const {
      target: { value, name }
    } = e;

    setAddress({
      ...address,
      [name]: value
    });
  };

  const handleExit = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <section id="account">
      <main className="account-page">
        <header>
          <Logo />
          <h2>
            Olá {`${user.name} ${user.lastname}, esperamos que esteja bem.`}
          </h2>
        </header>
        <div className="btn-exit">
          <ButtonDefault
            onClick={() =>
              confirmAlert({ ...options, closeOnClickOutside: true })
            }
            title="Sair"
          />
        </div>
        <div>
          <hr />
          <p>Veja abaixo algumas infomações úteis</p>
        </div>
        <div className="symptom">
          <label className="label-symptom">
            <span>
              <h3>Possui algum dos sintomas do covid-19?</h3>
            </span>
            <Switch onChange={handleCheckOption} checked={checked} />
          </label>
        </div>
        <div className="address">
          <label>
            <h3>Endereço cadastrado</h3>
          </label>
          <FormDefaultWrapper onSubmit={handleSubmitForm}>
            <InputDefault
              type="cel"
              required
              onChange={() => {}}
              placeholder="Cep"
              value={address.postalCode}
              name="postalCode"
              title="CEP"
              onChange={handleChange}
            />
            <InputDefault
              type="text"
              required
              onChange={() => {}}
              placeholder="Rua"
              name="logradouro"
              disabled
              title="Rua"
              value={address.logradouro}
              onChange={handleChange}
            />
            <InputDefault
              type="text"
              required
              onChange={() => {}}
              placeholder="Complemento"
              name="complemento"
              title="Complemento"
              disabled
              value={address.complemento}
              onChange={handleChange}
            />
            <InputDefault
              type="text"
              required
              onChange={() => {}}
              placeholder="Bairro"
              name="bairro"
              disabled
              title="Bairro"
              value={address.bairro}
              onChange={handleChange}
            />
            <InputDefault
              type="text"
              required
              onChange={() => {}}
              placeholder="Localidade"
              name="localidade"
              disabled
              title="Localidade"
              value={address.localidade}
              onChange={handleChange}
            />
            <InputDefault
              type="text"
              required
              onChange={() => {}}
              placeholder="UF"
              name="uf"
              disabled
              title="UF"
              value={address.uf}
              onChange={handleChange}
            />
            <InputDefault
              type="cel"
              required
              onChange={() => {}}
              placeholder="Número"
              name="number"
              title="Número"
              value={address.number}
              onChange={handleChange}
            />
            <ButtonDefault
              type="submit"
              title={user.address ? "Atualizar" : "Cadastrar"}
            />
          </FormDefaultWrapper>
        </div>
      </main>
    </section>
  );
}
export default withUserData(Account);

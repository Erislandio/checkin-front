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
import axios from "axios";
import InputMask from "react-input-mask";
import { api } from "../../services/api";
import { useToasts } from "react-toast-notifications";
import LoadingOverlay from "react-loading-overlay";

function Account({ history }) {
  const { addToast } = useToasts();
  const {
    user: {
      token,
      setUser,
      user,
      user: { address: userAddress, symptom }
    }
  } = useContext(UserContext);

  const [checked, setChecked] = useState(symptom);
  const [address, setAddress] = useState({
    postalCode: userAddress?.postalCode || "",
    complemento: userAddress?.complemento || "",
    bairro: userAddress?.bairro || "",
    uf: userAddress?.uf || "",
    logradouro: userAddress?.logradouro || "",
    localidade: userAddress?.localidade || "",
    number: userAddress?.localidade || ""
  });
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);

    api
      .patch(
        "/address",
        {
          ...address,
          email: user.email,
          number: parseInt(address.number)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(({ data }) => {
        if (data) {
          setUser(data);
          addToast("Endereço atualizado com sucesso!", {
            appearance: "info"
          });
        }
      })
      .catch(() => {
        addToast("ENão foi possível atualizar o seu endereço no momento", {
          appearance: "error"
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = e => {
    const {
      target: { value, name }
    } = e;

    setAddress({
      ...address,
      [name]: value
    });

    if (name === "postalCode") {
      let cep = value.replace(/\_|-/g, "");
      console.log(cep.length);

      axios
        .get(`https://viacep.com.br/ws/${value.replace(/\.|\-/, "")}/json/`)
        .then(({ data }) => {
          if (data.erro && cep.length === 8) {
            addToast(
              `Nenhum endereço foi encontrado para o CEP: ${address.postalCode}`,
              {
                appearance: "warning"
              }
            );
            return setAddress({
              ...address
            });
          }

          setAddress({
            ...data,
            postalCode: data.cep
          });
        });
    }
  };

  const handleExit = () => {
    localStorage.removeItem("user");
    history.go("/");
  };

  console.log(address);

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
            <div className="default-input">
              <label>CEP</label>
              <InputMask
                mask="99999-999"
                onChange={handleChange}
                name="postalCode"
                value={address.postalCode}
                placeholder="xx.xxx-xxx"
              />
            </div>
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
              type="text"
              required
              onChange={handleChange}
              placeholder="Complemento"
              name="complemento"
              title="Complemento"
              value={address.complemento}
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
              isLoading={isLoading}
              title={user.address ? "Atualizar" : "Cadastrar"}
            />
          </FormDefaultWrapper>
        </div>
      </main>
      <LoadingOverlay
        active={isLoading}
        spinner
        className="loading-modal"
        text="Atualizando aguarde..."
      ></LoadingOverlay>
    </section>
  );
}
export default withUserData(Account);

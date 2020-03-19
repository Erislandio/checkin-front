import React, { useEffect } from "react";
import { api } from "../../services/api";
import { withUserData } from "../../atoms/withUserData";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { useToasts } from "react-toast-notifications";
import "./home.css";
import { Logo } from "../../../assets/icons";

function PreHome({ history, user, setUser }) {
  const { addToast } = useToasts();

  const sendSymptom = async () => {
    try {
      const { token } = user;
      const { data } = await api.patch(
        "/user",
        {
          email: user.email
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.user) {
        setUser(data);
        return finish();
      }
      return finish(true);
    } catch (error) {
      return finish(true);
    }
  };

  function finish(fin) {
    const message = fin
      ? "Não foi possível atualizart seu cadastro, tente novamente!"
      : "Cadastro atualizado";

    addToast(message, {
      appearance: "info"
    });
    setTimeout(() => {
      if (fin) {
        return confirmAlert(options);
      }

      history.push("/home");
    }, 2000);
  }

  const options = {
    title: "Alerta",
    message: "Como você se sente hoje? apresenta algum simtoma do covid-19?",
    buttons: [
      {
        label: "Sim",
        onClick: () => sendSymptom()
      },
      {
        label: "Não",
        onClick: () => finish()
      }
    ],
    closeOnEscape: false,
    closeOnClickOutside: false
  };

  useEffect(() => {
    confirmAlert(options);
  }, []);

  return (
    <div className="loading-data">
      <Logo />
      <h2>Checkin</h2>
      <p>Carregando informações...</p>
    </div>
  );
}

export default withUserData(PreHome);

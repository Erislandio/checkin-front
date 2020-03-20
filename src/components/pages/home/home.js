import React, { useState, useEffect, useContext } from "react";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import "./home.css";
import { BottomNavigation } from "./bottomNavigator";
import { api } from "../../services/api";
import { useToasts } from "react-toast-notifications";
import { Logo } from "../../../assets/icons";
import { UserContext } from "../../Index";

function Home() {
  const { user } = useContext(UserContext);

  const [location, setLocation] = useState({
    viewport: {
      center: [0, 0],
      zoom: 15
    }
  });


  const [userLocation, setUserLocation] = useState([0, 0]);
  const [loadingData, setLoadingData] = useState(false);
  const [users, setUsers] = useState([]);
  const { addToast } = useToasts();

  const findUsersWithSymptom = (latitude, longitude) => {
    setLoadingData(true);

    const { token } = user;

    api
      .post(
        "/search",
        {
          latitude,
          longitude
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(({ data: { users } }) => {
        if (!users.length) {
          return addToast(
            "Não encontramos pessoas com sintomas de covid-19 na sua região",
            {
              appearance: "info"
            }
          );
        }

        setUsers(users);
      })
      .catch(() => {
        return addToast("Não foi possível fazer uma busca na sua região :-(", {
          appearance: "warning"
        });
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  const getLocation = () => {
    setLoadingData(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setUserLocation([latitude, longitude]);
        setLocation({
          ...location,
          viewport: { center: [latitude, longitude] }
        });
        findUsersWithSymptom(latitude, longitude);
      }
    );
  };

  const onViewportChanged = viewport => {
    setLocation({ viewport });
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (loadingData) {
    return (
      <div className="loading-data">
        <Logo />
        <h2>Checkin</h2>
        <p>Carregando informações...</p>
      </div>
    );
  }

  console.log(user)

  return (
    <section className="app" id="app">
      <div>
        <Map
          center={location.viewport.center}
          zoom={15}
          viewport={location.viewport}
          onViewportChanged={onViewportChanged}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={userLocation}>
            <Popup>
              {`Olá ${user.user.name} ${user.user.lastname}, você esta aqui `}
            </Popup>
          </Marker>
          {users.length &&
            users.map(user => {
              return (
                <Marker position={user.location.coordinates} key={user._id}>
                  <Popup>
                    {`${user.name} ${user.lastname} `}
                    está com os simtomas do covid-19
                  </Popup>
                </Marker>
              );
            })}
        </Map>
      </div>
      <BottomNavigation
        search={findUsersWithSymptom}
        latitude={userLocation[0]}
        longitude={userLocation[1]}
      />
    </section>
  );
}

export default Home;

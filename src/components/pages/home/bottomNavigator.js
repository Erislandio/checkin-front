import React from "react";
import { Link } from "react-router-dom";
import { IoIosSettings, IoIosSearch, IoIosHome } from "react-icons/io";

export function BottomNavigation({ search, latitude, longitude }) {
  return (
    <div className="bottom-navigator">
      <ul>
        <li>
          <Link onClick={() => search(latitude, longitude)}>
            <IoIosSearch size={30} color="#c599c6" />
          </Link>
        </li>
        <li>
          <Link to="/home">
            <IoIosHome size={30} color="#c599c6" />
          </Link>
        </li>
        <li>
          <Link to="search">
            <IoIosSettings size={30} color="#c599c6" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

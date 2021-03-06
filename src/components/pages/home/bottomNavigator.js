import React from "react";
import { Link } from "react-router-dom";
import { IoIosSettings, IoIosSearch, IoIosHome, IoMdMap } from "react-icons/io";

export function BottomNavigation({ search, latitude, longitude }) {
  return (
    <div className="bottom-navigator">
      <ul>
        <li>
          <span onClick={() => search(latitude, longitude)}>
            <IoIosSearch size={30} color="#c599c6" />
          </span>
        </li>
        <li>
          <Link to="/home">
            <IoMdMap size={30} color="#c599c6" />
          </Link>
        </li>
        <li>
          <Link to="/account">
            <IoIosSettings size={30} color="#c599c6" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

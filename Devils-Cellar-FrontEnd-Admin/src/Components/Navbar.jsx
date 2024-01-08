import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Navbar() {
  const admin = useSelector((state) => state.admin);

  return (
    <nav className="admin-navbar">
      <ul className="nav-bar-iconos">
        <li>ADMIN</li>
        {admin && (
          <li>
            <NavLink>
              <img
                src={`${import.meta.env.VITE_BACKET_URL}/${admin.avatar}`}
                alt="admin-avatar"
                className="admin-avatar"
              />{" "}
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

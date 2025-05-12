import { Link, NavLink } from "react-router-dom";

export default function LinkButton({ isLoggedIn }) {
  return (
    <NavLink to="/dashboard" className="linkButton">
      {isLoggedIn ? "Min side" : "Logg inn"}
    </NavLink>
  );
}
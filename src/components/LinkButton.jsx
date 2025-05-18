import { Link, NavLink } from "react-router-dom";

export default function LinkButton({ isLoggedIn, currentUser }) {
  return (
    <NavLink to="/dashboard" className="linkButton">
      {isLoggedIn ? currentUser.name : "Logg inn"}
    </NavLink>
  );
}
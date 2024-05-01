import { Link, NavLink, Switch } from "react-router-dom";
import "./Menu.css"
import Authorized from "./auth/authorize";
import Button from "./Forms/Button";
import { logout } from "./auth/handleJWT";
import { useContext } from "react";
import AuthenticationContext from "./auth/authentificationContext";

export default function Menu() {
  const { update, claims } = useContext(AuthenticationContext);

  function getUserEmail(): string {
    return claims.filter((x) => x.name === "email")[0]?.value;
  }

  return (
    <Switch>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="menu-main" to="/hotels">
            Hotels
          </NavLink>
          <Authorized
            authorized={
              <NavLink className="menu-sub" to="/hotels/create">
                Add New Hotel
              </NavLink>}
              role="hotelOwner"
          />
          <Authorized
            authorized={
              <NavLink className="menu-sub" to="/accounts/listUsers">
                Users List
              </NavLink>}
              role="admin"
          />
          <Authorized
            authorized={
              <span className="menu-auth-el">
                <span className="menu-auth">Hello, {getUserEmail()}</span>
                <Button
                  onClick={() => {
                    logout();
                    update([]);
                  }}
                  className="menu-auth menu-button"
                >
                  Log Out
                </Button>
              </span>
            }
            notAuthorized={
              <span className="menu-auth-el">
                <Link
                  to="/accounts/create"
                  className="menu-auth"
                >
                  Register
                </Link>
                <Link
                  to="/accounts/login"
                  className="menu-auth"
                >
                  Login
                </Link>
              </span>
            }
          />
        </div>
      </nav>
    </Switch>
  );
}
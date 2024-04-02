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
          <NavLink className="menu-sub" to="/hotels/create">
            Add New Hotel
          </NavLink>
          <Authorized
            authorized={
              <>
                <span className="nav-link">Hello, {getUserEmail()}</span>
                <Button
                  onClick={() => {
                    logout();
                    update([]);
                  }}
                  className="nav-link btn btn-link"
                >
                  Log Out
                </Button>
              </>
            }
            notAuthorized={
              <>
                <Link
                  to="/accounts/create"
                  className="nav-link btn btn-link"
                >
                  Register
                </Link>
                <Link
                  to="/accounts/login"
                  className="nav-link btn btn-link"
                >
                  Login
                </Link>
              </>
            }
          />
        </div>
      </nav>
    </Switch>
  );
}
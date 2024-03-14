import { NavLink, Switch } from "react-router-dom";
import "./Menu.css"

export default function Menu() {
    return (
        <Switch>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <NavLink className="menu-main" to="/hotels">
                Hotels
              </NavLink>
            </div>
          </nav>
        </Switch>
    );
}
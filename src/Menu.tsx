import { NavLink, Switch } from "react-router-dom";

export default function Menu() {
    return (
        <Switch>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/hotels">
                Hotels
              </NavLink>
            </div>
          </nav>
        </Switch>
    );
}
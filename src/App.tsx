import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import HotelPage from './hotels/hotelsPage';
import HotelDetails from './hotels/hotelDetails';
import HotelCreation from './hotels/hotelCreation';
import HotelEdit from './hotels/hotelEdit';
import RoomDetails from './rooms/roomDetails';
import RoomCreation from './rooms/roomCreation';
import RoomEdit from './rooms/roomEdit';
import Register from './auth/register';
import Authorized from './auth/authorize';
import Login from './auth/login';
import { useEffect, useState } from 'react';
import { getClaims } from './auth/handleJWT';
import { claim } from './auth/auth.model';
import AuthenticationContext from './auth/authentificationContext';
import UsersPage from './auth/usersPage';

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims());
  }, []);

  function isAdmin() {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "admin"
      ) > -1
    );
  }

  function isHotelOwner() {
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "hotelOwner"
      ) > -1
    );
  }


  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
            <div className="menu">
              <Menu />
            </div>
            <div className='container'>
              <Route exact path="/hotels">
                <HotelPage />
              </Route>
              <Route exact path="/hotels/create">
                <HotelCreation />
              </Route>
              <Route exact path="/hotels/edit/:id">
                <HotelEdit />
              </Route>
              <Route exact path="/hotels/hotel/:id">
                <HotelDetails />
              </Route>

              <Route exact path="/hotels/:id/rooms/create">
                <RoomCreation />
              </Route>
              <Route exact path="/hotels/:hotelId/rooms/edit/:id">
                <RoomEdit />
              </Route>
              <Route exact path="/hotels/:hotelId/rooms/room/:id">
                <RoomDetails />
              </Route>

              <Route exact path="/accounts/create">
                <Register />
              </Route>
              <Route exact path="/accounts/login">
                <Login />
              </Route>
              <Route exact path="/accounts/listUsers" >
                <UsersPage />
              </Route>
            </div>
          </AuthenticationContext.Provider>
        </Switch>
        <footer className="footer">
          <div>
            Made by Kaunaz Dagaz
          </div>
        </footer>
      </BrowserRouter >
    </>
  );
}

export default App;

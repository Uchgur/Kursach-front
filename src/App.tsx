import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import ReservationCreation from './reservations/reservationCreation';
import ReservationConfirmation from './reservations/reservationConfirm';
import ReservationsPage from './reservations/reservationsPage';
import configureInterceptor from './utils/HttpInterceptors';
import ImagesPage from './images/imagesPage';
import FilterHotels from './hotels/filterHotels';
import MyHotelsPage from './hotels/myHotelsPage';

configureInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims());
    console.log(claims)
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
            <Authorized authorized={
              <div className='container'>
                <Route exact path="/hotels">
                  <HotelPage />
                </Route>
                <Route exact path="/hotels/filter">
                  <FilterHotels />
                </Route>
                {isHotelOwner() ? (
                  <>
                    <Route exact path="/hotels/myhotels">
                      <MyHotelsPage />
                    </Route>
                    <Route exact path="/hotels/create">
                      <HotelCreation />
                    </Route>
                    <Route exact path="/hotels/edit/:id">
                      <HotelEdit />
                    </Route>
                  </>
                ) : (
                  <>
                    <Route exact path="/hotels/myhotels">
                      <h4 className='block-message'>You are not allowed to see this page</h4>
                    </Route>
                    <Route exact path="/hotels/create">
                      <h4 className='block-message'>You are not allowed to see this page</h4>
                    </Route>
                    <Route exact path="/hotels/edit/:id">
                      <h4 className='block-message'>You are not allowed to see this page</h4>
                    </Route>
                  </>
                )}
                <Route exact path="/hotels/hotel/:id">
                  <HotelDetails />
                </Route>

                {isHotelOwner() ? (
                  <>
                    <Route exact path="/hotels/:id/rooms/create">
                      <RoomCreation />
                    </Route>
                    <Route exact path="/hotels/:hotelId/rooms/edit/:id">
                      <RoomEdit />
                    </Route>
                  </>
                ) : (
                  <>
                    <Route exact path="/hotels/:id/rooms/create">
                      <h4 className='block-message'>You are not allowed to see this page</h4>
                    </Route>
                    <Route exact path="/hotels/:hotelId/rooms/edit/:id">
                      <h4 className='block-message'>You are not allowed to see this page</h4>
                    </Route>
                  </>
                )}
                <Route exact path="/hotels/:hotelId/rooms/room/:id">
                  <RoomDetails />
                </Route>

                {isHotelOwner() ? (
                  <>
                    <Route exact path="/hotels/:hotelId/rooms/reservations">
                      <ReservationsPage />
                    </Route>
                    <Route exact path="/hotels/:hotelId/rooms/:roomId/reservation/:id/confirm">
                      <ReservationConfirmation />
                    </Route>
                  </>
                ) : (
                  <>
                    <Route exact path="/hotels/:hotelId/rooms/reservations">
                      <h4 className='block-message'>You are not allowed to see this page</h4>
                    </Route>
                    <Route exact path="/hotels/:hotelId/rooms/:roomId/reservation/:id/confirm">
                      <h4 className='block-message'>You are not allowed to see this page</h4>
                    </Route>
                  </>
                )}
                <Route exact path="/hotels/:hotelId/rooms/:id/reservation/create">
                  <ReservationCreation />
                </Route>

                {isHotelOwner() ? (
                  <>
                    <Route exact path="/hotels/:id/images/edit">
                      <ImagesPage isRoom={false} />
                    </Route>
                    <Route exact path="/hotels/:hotelId/rooms/:id/images/edit">
                      <ImagesPage isRoom={true} />
                    </Route>
                  </>
                ) : (
                  <>
                    <Route exact path="/hotels/:id/images/edit">
                      <h4 className='block-message'>You are not allowed to see this page</h4>
                    </Route>
                    <Route exact path="/hotels/:hotelId/rooms/:id/images/edit">
                      <h4 className='block-message'>You are not allowed to see this page</h4>
                    </Route>
                  </>
                )}

                {isAdmin() ? (
                  <>
                    <Route exact path="/accounts/listUsers" >
                      <UsersPage />
                    </Route>
                  </>
                ) : (
                  <>
                    <Route exact path="/accounts/listUsers" >
                      <h4 className='block-message'>You are not allowed to see this page</h4>
                    </Route>
                  </>
                )}
              </div>
            }
              notAuthorized={<div>
                <Route exact path="/accounts/create">
                  <Register />
                </Route>
                <Route exact path="/accounts/login">
                  <Login />
                </Route>
                <h4 className='block-message'>Please login to see this page</h4>
              </div>}
            />
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

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import HotelPage from './hotels/hotelsPage';
import HotelDetails from './hotels/hotelDetails';
import HotelCreation from './hotels/hotelCreation';
import HotelEdit from './hotels/hotelEdit';
import RoomDetails from './rooms/roomDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="menu">
          <Menu />
        </div>
        <div className='container'>
          <Switch>
            <Route exact path="/hotels">
              <HotelPage />
            </Route>
            <Route exact path="/hotels/create">
              <HotelCreation />
            </Route>
            <Route exact path="/hotels/edit/:id">
              <HotelEdit />
            </Route>
            <Route exact path="/hotels/:id">
              <HotelDetails />
            </Route>
            <Route exact path="/rooms/:id">
              <RoomDetails />
            </Route>
          </Switch>
        </div>
        <footer className="footer">
          <div>
            Made by Kaunaz Dagaz
          </div>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;

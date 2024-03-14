import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import HotelPage from './hotels/HotelsPage';
import HotelDetails from './hotels/HotelDetails';

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
            <Route exact path="/hotels/:id">
              <HotelDetails />
            </Route>
          </Switch>
        </div>
        <footer className="footer">
          <div className="container">
            Made by Kaunaz Dagaz
          </div>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;

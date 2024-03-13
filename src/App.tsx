import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import HotelPage from './hotels/HotelsPage';
import HotelDetails from './hotels/HotelDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route exact path="/hotels">
            <HotelPage />
          </Route>
          <Route exact path="/hotels/:id">
            <HotelDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

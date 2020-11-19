

import HomePage from './Components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from './Components/SignIn';
import 'fontsource-roboto';
import ParkingPage from './Components/ParkingPage';
import ParkingLot from './Components/ParkingLot';
import InProgress from './Components/InProgress';

function App() {
  return (
    <Router>
      <Route path="/" exact component={NavBar} />
      <Route path="/" exact component={HomePage} />
      <Route path="/signin" exact component={SignIn} />
     <Route path="/parking" exact component={ParkingPage} />
     <Route path="/inprogress" exact component={InProgress} />
      <Route path="/parking_lot/:lot_uuid/:zone_uuid"   component={ParkingLot} />
    </Router>
  );
}

export default App;

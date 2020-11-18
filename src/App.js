

import Homepage from './Components/Homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signin from './Components/Signin';
import 'fontsource-roboto';

function App() {
  return (
    <Router>
      <Route path="/" exact component={NavBar} />
      <Route path="/" exact component={Homepage} />
      <Route path="/signin" exact component={Signin} />
     {/* <Route path="/parking" exact component={Parkingpage} />
      <Route path="/parking_lot/:lot_uuid/:zone_uuid"   component={ParkingLot} />*/}
    </Router>
  );
}

export default App;

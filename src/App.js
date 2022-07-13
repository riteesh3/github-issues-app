import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IssueDetails from './IssueDetails';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <div className="content">
          <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/IssueDetails/:reponame/:issuenumber">
                <IssueDetails />
              </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

import Page from "./login/Page";
import Dashboard from "./Dashboard/Dashboard";
import Claims from './Claims/Claims'
import Verification from './login/PasswordVerification/Verification'
import SearchEnrollee from "./Dashboard/SearchEnrollee/SearchEnrollee";
import List from "./Claims/Claimslist/List"
import SubmittedList from "./Claims/Claimslist/SubmittedList";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Page} />
        <Route path='/dash'  component={Dashboard} />
        <Route path = '/claims' component ={Claims} />
        <Route exact path="/Verification" component={Verification} />
        <Route exact path="/SearchEnrollee" component={SearchEnrollee} />
        <Route exact path="/List" component={List} />
        <Route exact path="/SubmittedList" component={SubmittedList} />
      </Switch>
    </Router>
  );
}

export default App;

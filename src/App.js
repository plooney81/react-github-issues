import { BrowserRouter, NavLink, Redirect, Route, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import IssueList from './components/IssueList/IssueList';
import IssuesByLabel from './components/IssuesByLabel/IssuesByLabel';
import IssueDetail from './components/IssueDetail/IssueDetail';
import User from './components/User/User';
import UserDetail from './components/UserDetial/UserDetail';


function App() {
  // Fake login state
  const [loggedIn, setLoggedIn] = useState(false);
  // const history = useHistory();

  // Listens to the logged in state
  // useEffect(() => {
  //   if (!loggedIn){
  //     history.push('/');
  //   }
  // }, [loggedIn, history])
  return (
    <BrowserRouter>
      <ul>
        <li><NavLink to="/home">Home</NavLink></li>
        {loggedIn && (<li><NavLink to="/issues">Issues</NavLink></li>)}
        {loggedIn && (<li><NavLink to="/users">UserSearch</NavLink></li>)}
        { loggedIn ? 
        (<li><button onClick={()=> {setLoggedIn(false)}}>Log Out</button></li>)
        : (<li><button onClick={()=> {setLoggedIn(true)}}>Log In</button></li>)
        }
      </ul>
      <div className="App">
        <Route exact path="/home">
          <h1>Home</h1>
        </Route>
        {/* Protects these routes like checkAuth */}
        { loggedIn && (
          <>
            <Route exact path="/issues" component={IssueList}/>
            <Route path="/labels/:name" component={IssuesByLabel}/>
            <Route path="/issues/detail/:number" component={IssueDetail}/>
            <Route path="/users" component={User}/>
            <Route path="/user/detail/:login" component={UserDetail}/>
          </>
        )}
        <Route>
          {/* Sends back to home page if route isn't found */}
          <Redirect to="/" />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;

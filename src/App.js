import { BrowserRouter, Link, Redirect, Route, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import IssueList from './components/IssueList/IssueList.js';
import IssuesByLabel from './components/IssuesByLabel/IssuesByLabel.js';


function App() {
  // Fake login state
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  // Listens to the logged in state
  useEffect(() => {
    if (!loggedIn){
      history.push('/');
    }
  }, [loggedIn, history])
  return (
    <BrowserRouter>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/issues">Issues</Link></li>
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

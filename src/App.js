import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./ReEcho_Logo.svg"

import AuthService from "./services/auth.service";

import Login from "./components/login";
import Register from "./components/register";
// import RecruiterProfile from "./components/RecruiterProfile";
import IndividualProfile from "./components/IndividualProfile";
import Home from "./components/home";
import MainPanel from "./components/MainPanel";
import BoardUser from "./components/board-user";
import BoardModerator from "./components/board-moderator";
import BoardAdmin from "./components/board-admin";
import MainForm from './components/onboard/MainForm';
import TagManager from './components/onboard/TagManager';
import JobMemo from './components/onboard/JobMemo'
import RecruiterProfile from './components/RecruiterProfile'
import CandidatePreview from './components/CandidateView'
// import RecruiterPanel from "./components/RecruiterPanel";




class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        // showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand">
            <Link to={"/"} className="navbar-brand">
            <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <div className="navbar-nav mr-auto">
              {/* <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li> */}

              {/* {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )} */}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="login-item">
                  <Link to={"/login"} className="login-link">
                    Login
                  </Link>
                </li>

                &nbsp;&nbsp; &nbsp;&nbsp;
              

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                  <button type="button" className="btn btn-primary">Get Started</button>
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={MainForm} />
              <Route exact path="/tagmanager" component={TagManager} />
              <Route exact path="/jobmemo" component={JobMemo} />
              <Route exact path="/individual" component={MainPanel} />
              <Route exact path="/preview" component={CandidatePreview} />
              {/* <Route exact path="/recruiter" component={RecruiterProfile} /> */}
              {/* <Route exact path="/recruiter" component={RecruiterPanel} /> */}





              {/* <Route exact path="/newrecruiter" component={RecruiterProfile} /> */}
              {/* <Route exact path="/newindividual" component={IndividualProfile} /> */}
              {/* <Route exact path="/profile" component={Profile} /> */}
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

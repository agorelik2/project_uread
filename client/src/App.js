import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import API from "./utils/API";
import Books from "./pages/books";
import UserBooks from "./pages/userBooks";
import Detail from "./pages/detail";
import Favorites from "./pages/favorites";
import Reviews from "./pages/reviews";
import Search from "./pages/search";
import "./App.css";

class App extends Component {
  //Constructor for states
  constructor() {
    super();
    this.state = {
      isloggedIn: false,
      email: "",
      id: "",
      firstName: "",
      lastName: "",
      redirect: false,
      user: {},
    };
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  //when component mounts get user
  componentDidMount() {
    this.getUser();
  }

  //Update the user
  updateUser(userObject) {
    let tempuser = {
      email: userObject.email,
      firstName: userObject.firstName,
      lastName: userObject.lastName,
    };
    if (userObject._id) {
      tempuser.id = userObject._id;
    } else {
      tempuser.id = userObject.id;
    }
    this.setState(tempuser); //this.setState({ user: userObject }) OR this.setState({ user: tempuser })?
    console.log(userObject);
  }

  getUser = () => {
    console.log("login method");
    return API.getUsers().then((response) => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");
        console.log(response.data.user._id);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++=");
        this.setState({
          isloggedIn: true,
          email: response.data.user.email,
          id: response.data.user._id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
        });
        console.log("app.js id");
        console.log(this.state.id);
      } else {
        console.log("Get user: no user");
        this.setState({
          isloggedIn: false,
          email: "",
          firstName: "",
          lastName: "",
          id: null,
        });
      }
    });
  };

  render() {
    return (
      <Router>
        <Container fluid className="p-0">
          <Switch>
            <Route
              exact
              path="/signup"
              render={(props) => (
                <SignUp
                  {...props}
                  logIn={this.logIn}
                  updateUser={this.updateUser}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => <SignIn updateUser={this.updateUser} />}
              //render={(props) => <SignUp {...props} logIn={this.logIn} />}
            />
            <Route
              exact
              path="/signin"
              render={() => <SignIn updateUser={this.updateUser} />}
            />
            <Route
              exact
              path="/search"
              render={() => (
                <Search
                  // updateUser={this.updateUser}
                  isloggedIn={this.state.isloggedIn}
                  id={this.state.id}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                />
              )}
            />
            <Route
              exact
              path="/favorites"
              render={() => (
                <Favorites
                  isloggedIn={this.state.isloggedIn}
                  id={this.state.id}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                />
              )}
            />
            <Route
              exact
              path="/books"
              render={() => (
                <Books
                  email={this.state.email}
                  isloggedIn={this.state.isloggedIn}
                  id={this.state.id}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                />
              )}
            />
            <Route exact path="/books/uid">
              <UserBooks
                email={this.state.email}
                isloggedIn={this.state.isloggedIn}
                id={this.state.id}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
              />
            </Route>

            <Route exact path="/books/:id">
              <Detail />
            </Route>
            <Route exact path="/reviews/:id">
              <Reviews
                id={this.state.id}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
              />
            </Route>
            <Route
              exact
              path="*"
              render={() => <SignIn updateUser={this.updateUser} />}
            />
          </Switch>
        </Container>
      </Router>
    );
  }
}
export default App;

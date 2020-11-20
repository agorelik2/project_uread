import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";

import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { set } from "mongoose";

//Signin component
function SignIn(props) {
  //   const classes = useStyles();

  //Email hook
  const [emailInput, setEmailInput] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  //Setting the state of email
  const handleEmailInput = (event) => {
    setEmailInput(event.target.value);
    console.log(emailInput);
  };

  //Password Hook
  const [passwordInput, setPasswordInput] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  //Setting the state of password
  const handlePasswordInput = (event) => {
    setPasswordInput(event.target.value);
    console.log(passwordInput);
    let pl = passwordInput.length;
    console.log(pl);
  };

  //Redirect hook
  const [redirect, setRedirect] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log("handleSignIn");
    if (emailInput && passwordInput) {
      API.login({
        email: emailInput,
        password: passwordInput,
      })
        .then((response) => {
          console.log("login response: ");
          console.log(response);
          if (response.status === 200) {
            // update App.js state
            props.updateUser(response.data);
            // update the state to redirect to books
            setRedirect("/books");
          }
        })
        .catch((error) => {
          console.log("login error: ");
          console.log(error);
          setErrorEmail("");
          setErrorPassword("*Invalid email or password");
        });
    } else {
      setErrorEmail("*Please enter your email");
      setErrorPassword("*Please enter your password");
    }
  };
  //If redirect is true redirect, or else show signup page
  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />;
  } else {
    //show sign-ip page
    return (
      <Container>
        <div className="section-content m-5">
          <h1 className="section-header">
            Share your favorite books with{" "}
            <span
              className="content-header wow fadeIn "
              data-wow-delay="0.2s"
              data-wow-duration="2s"
            >
              {" "}
              <br></br>
              URead
            </span>
          </h1>
          <h3 className="subt">log in and start sharing</h3>
        </div>
        <div className="container w-50 shadow-lg round flex-d ">
          <div className="row justify-content-center p-5 ">
            <div className="contact-section col-lg-6 p-0 m-0 ">
              <form>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="form-control"
                    value={emailInput}
                    name="email"
                    id="email"
                    onChange={handleEmailInput}
                    type="text"
                    placeholder="john@abc.com"
                  />
                  <p style={{ color: "red", fontSize: "15px" }}>{errorEmail}</p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="form-control"
                    value={passwordInput}
                    name="password"
                    onChange={handlePasswordInput}
                    type="password"
                    placeholder="Password"
                  />
                  <p style={{ color: "red", fontSize: "15px" }}>
                    {errorPassword}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="btn btn-primary w-100"
                >
                  {" "}
                  Sign In
                </button>
                <br></br>
                <br></br>
                <Link to={"/signup"}>No Account? Sign Up Here</Link>
              </form>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default SignIn;

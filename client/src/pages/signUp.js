import React, { useState } from "react";
import Api from "../utils/API";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

//SignUp component
function SignUp(props) {
  // const classes = useStyles();

  //Redirect hook
  const [redirect, setRedirect] = useState("");

  //Hook for email
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  //Handle input for email
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
    setErrorEmail("");
    setErrorPassword("");
    console.log(email);
  };

  //Password hook
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  //Handle input for password
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
    console.log(password);
    if (password.length > 6 && errorPassword != "") {
      setErrorPassword("");
    }
  };

  //firstName hook
  const [firstName, setFirstName] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");

  //Handle input for first name
  const handleFirstNameInput = (event) => {
    setFirstName(event.target.value);
    if (firstName.length > 1 && errorFirstName != "") {
      setErrorFirstName("");
    }
  };

  //Last name hook
  const [lastName, setLastName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");

  //Handle input for last name
  const handleLastNameInput = (event) => {
    setLastName(event.target.value);
    console.log(lastName);
    if (lastName.length > 1 && errorLastName != "") {
      setErrorLastName("");
    }
  };

  //Validate User's Input
  const validateInput = () => {
    let fl = firstName.length;
    console.log("fl:", fl);
    if (!firstName || fl < 2) {
      setErrorFirstName("*Invalid First Name");
    }

    let ll = lastName.length;

    if (!lastName || ll < 2) {
      console.log("ll:", ll);
      setErrorLastName("*Invalid Last Name");
    }
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      setErrorEmail("*Invalid Email Address");
    }

    let pl = password.length;
    if (!password || pl < 6) {
      setErrorPassword("*Password has to be at least 6 char long");
    }

    if (
      firstName &&
      fl > 2 &&
      lastName &&
      ll > 2 &&
      pattern.test(email) &&
      password &&
      pl > 6
    ) {
      return true;
    } else {
      return false;
    }
  };

  //Saving person in database
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicked");

    const isValid = await validateInput();
    console.log(isValid);

    if (isValid) {
      console.log("passed validation pppp");
      Api.signup({
        firstName,
        lastName,
        email,
        password,
      })
        .then((response) => {
          console.log("signup response: ");
          console.log(response);
          console.log(response.status);
          if (response.status === 200 && !response.data.errors) {
            // update App.js state
            props.updateUser(response.data);
            //props.id = response.data._id;
            console.log(props.id);
            console.log("~~~~~~~~~~~~~~~)");
            console.log("response data from SignUp 132");
            console.log(response.data);
            // update the state to redirect to books
            setRedirect("/books");
          } else {
            if (response.status === 201) {
              setErrorPassword(response.data.error);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorEmail(error);
        });
    } else {
      console.log("failed validation pppp");
    }
  };

  //If redirect is true redirect, or else show signin page
  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />;
  } else {
    //show sign-up page
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
          <h3 className="subt">sign up and start sharing</h3>
        </div>
        <div className="container w-50 shadow-lg round flex-d ">
          <div className="row justify-content-center p-5 ">
            <div className="contact-section col-lg-6 p-0 m-0 ">
              <form>
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">
                    First Name:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="firstName"
                    placeholder="John"
                    name="firstName"
                    value={firstName}
                    onChange={handleFirstNameInput}
                  />
                  <p style={{ color: "red", fontSize: "15px" }}>
                    {errorFirstName}
                  </p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">
                    Last Name:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="lastName"
                    placeholder="Smith"
                    name="lastName"
                    value={lastName}
                    onChange={handleLastNameInput}
                  />
                  <p style={{ color: "red", fontSize: "15px" }}>
                    {errorLastName}
                  </p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    E-mail:
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    placeholder="john@abc.com"
                    name="email"
                    value={email}
                    onChange={handleEmailInput}
                  />
                  <p style={{ color: "red", fontSize: "15px" }}>{errorEmail}</p>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password:
                  </label>
                  <input
                    className="form-control"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordInput}
                  />
                  <p style={{ color: "red", fontSize: "15px" }}>
                    {errorPassword}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleSubmit}
                >
                  {" "}
                  Sign Up
                </button>
                <br></br>
                <br></br>
                <Link to={"/signin"}> Already a Member? Sign In </Link>
              </form>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(SignUp);

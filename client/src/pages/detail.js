import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";
import Nav from "../components/Nav";

function Detail(props) {
  const [book, setBook] = useState({});
  const [ruser, setRuser] = useState({});
  const [reviews, setReviews] = useState({});
  const [formObject, setFormObject] = useState({});

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const { id } = useParams();

  useEffect(() => {
    loadBook();
  }, []);

  useEffect(() => {
    loadReviews();
  }, []);

  function loadRuser(uid) {
    API.getUser(uid)
      .then((ures) => setRuser(ures.data))
      .catch((err) => console.log(err));
  }

  function loadBook() {
    API.getBook(id)
      .then((res) => {
        const uid = res.data.user;
        loadRuser(uid);
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }
  // // Loads all books and sets them to books
  function loadReviews() {
    API.getReviews()
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.description) {
      API.saveReview({
        title: book.title,
        author: book.author,
        description: formObject.description,
        user: props.id, ///ALG user id is being updated with props.id
        firstName: props.firstName,
        lastName: props.lastName,
      })

        .then((res) => {
          loadReviews();
          setFormObject({
            reviewText: "",
          });
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <Container fluid>
      <Nav
        id={props.id}
        firstName={props.firstName}
        lastName={props.lastName}
      />
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {book.title} by {book.author}
            </h1>
            <h4>
              Recommended by {ruser.firstName} {ruser.lastName}
            </h4>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <h2>Reviews</h2> <br></br>
            <p>
              <strong>
                {ruser.firstName} {ruser.lastName}
              </strong>
              : {book.description}
            </p>
          </article>
        </Col>
      </Row>
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h2>Recommend a Book</h2>
          </Jumbotron>
          <form>
            <TextArea
              onChange={handleInputChange}
              name="reviewText"
              placeholder="Review (Optional)"
              value={formObject.reviewText}
            />
            <FormBtn
              // disabled={!(formObject.author && formObject.title)}
              onClick={handleFormSubmit}
            >
              Submit Review
            </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h2>Check Out All The Reviews</h2>
            <Link to={"/books/uid"}>
              <h4>View Books Recommended by {props.firstName}</h4>
            </Link>
          </Jumbotron>
          {reviews.length ? (
            <List>
              {reviews.map((review) => (
                <ListItem key={review._id}>
                  <Link to={"/reviews/" + review._id}>
                    <strong>
                      {review.firstName} {review.lastName}:{" "}
                    </strong>
                    {review.reviewText}
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
      <Row>
        <Col size="md-10">
          <Link to="/books">← Back to All Recommended Books</Link>
        </Col>
      </Row>
      <Row>
        <Col size="md-10">
          <Link to="/books/uid">← Back to Books Recommended by you</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;

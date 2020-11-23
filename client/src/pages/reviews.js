import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import JumbotronSmall from "../components/JumbotronSmall";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";
import Nav from "../components/Nav";

function Reviews(props) {
  const [book, setBook] = useState({});
  const [ruser, setRuser] = useState({});
  const [reviews, setReviews] = useState({});
  const [formObject, setFormObject] = useState({});

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const { id } = useParams();
  console.log("First Name: ", props.firstName);
  console.log("Last Name: ", props.lastName);
  console.log("User Id: ", props.id);

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
    API.getReviewsByBook(id)
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
    if (formObject.reviewText) {
      console.log("bookid:", book._id);
      console.log("book.title: ", book.title);
      console.log("formObject.reviewText: ", formObject.reviewText);

      API.saveReview(id, {
        bookId: book._id,
        title: book.title,
        authors: book.author,
        reviewBody: formObject.reviewText,
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
              Reviews of {book.title} by {book.author}
            </h1>
            <h4>
              Recommended by {ruser.firstName} {ruser.lastName}
            </h4>
            <Row>
              <Col size="md-3">
                <Link to="/books" style={{ textAlign: "left" }}>
                  <i className="fas fa-long-arrow-alt-left"></i>{" "}
                  <span className="back-link">
                    Back to All Recommended Books
                  </span>
                </Link>
              </Col>
              <Col size="md-3"></Col>
              <Col size="md-3"></Col>
              <Col size="md-3">
                <Link to="/books/uid" style={{ textAlign: "left" }}>
                  <i className="fas fa-long-arrow-alt-left"></i>
                  <span className="back-link">
                    {" "}
                    Back to Books Recommended by you
                  </span>
                </Link>
              </Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>

      <Row>
        <Col size="md-6 sm-12">
          <JumbotronSmall>
            <h4>Read the Book? Please share your thoughts</h4>
          </JumbotronSmall>
        </Col>
        <Col size="md-6 sm-12">
          <JumbotronSmall>
            <h4>Check Out the Reviews of Our Members</h4>
          </JumbotronSmall>
        </Col>
      </Row>
      <Row style={{ marginTop: 0, paddingTop: 0 }}>
        <Col size="md-6 sm-12">
          <form>
            <TextArea
              style={{ marginTop: 0, paddingTop: 0 }}
              onChange={handleInputChange}
              name="reviewText"
              placeholder="Write a Review"
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
          <p className="recommendation">
            <strong>
              {ruser.firstName} {ruser.lastName}'s recommendation
            </strong>
            : {book.description}
          </p>
          {reviews.length ? (
            <div style={{ marginTop: 5 }}>
              <List>
                {reviews.map((review) => (
                  <ListItem key={review._id}>
                    {/* <Link to={"/reviews/read/" + review._id}> */}

                    <strong>
                      {review.firstName} {review.lastName}:{" "}
                    </strong>

                    {review.reviewBody}

                    {/* </Link> */}
                  </ListItem>
                ))}
              </List>
            </div>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Reviews;

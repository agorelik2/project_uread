import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Nav from "../components/Nav";

function Books(props) {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({
    title: props.location?.state?.title ?? "",
    author: props.location?.state?.authors[0] ?? "",
  });

  const [term, setTerm] = useState({});

  // console.log(props.location);
  // console.log("recom title: ", recomTitle);
  // console.log("recom  authors: ", recomAuthors);

  //console.log(props);

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
  }, []);

  // // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
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
    if (formObject.title && formObject.author) {
      console.log(formObject);
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        description: formObject.description,
        user: props.id, ///ALG user id is being updated with props.id
      })

        .then((res) => {
          loadBooks();
          setFormObject({
            title: "",
            author: "",
            description: "",
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
        <Col size="md-6">
          <Jumbotron>
            <h2>Recommend a Book</h2>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
              value={formObject.title}
            />
            <Input
              onChange={handleInputChange}
              name="author"
              placeholder="Author (required)"
              value={formObject.author}
            />
            <TextArea
              onChange={handleInputChange}
              name="description"
              placeholder="Why do you recommend this book? (Optional)"
              value={formObject.description}
            />
            <FormBtn
              disabled={!(formObject.author && formObject.title)}
              onClick={handleFormSubmit}
            >
              Submit Book
            </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h2>Check Out the Recommended Books</h2>
            <Link to={"/books/uid"}>
              <h4>View Books Recommended by {props.firstName}</h4>
            </Link>
            <p>
              Click on a book title to write a review or view our members'
              reviews. Click on a <i className="fas fa-search fa-2x"></i> to
              search Google for more detail info on the book.
            </p>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map((book) => (
                <ListItem key={book._id}>
                  <Link to={"/reviews/" + book._id + "/all"}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </Link>

                  <Link
                    to={{ pathname: "/search", state: { term: book.title } }}
                  >
                    <span className="search-btn">
                      <i className="fas fa-search fa-2x fa-pull-right"></i>
                    </span>
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Books;

import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import UpdateBtn from "../components/UpdateBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Nav from "../components/Nav";

function UserBooks(props) {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all books and store them with setBooks
  useEffect(() => {
    loadUserBooks();
  }, []);

  // Loads all books for the user, user populated with books
  function loadUserBooks() {
    console.log("loading user books");
    API.getBooksByUser()
      .then((res) => {
        console.log("////////////");
        console.log(res);

        return setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }

  //READ Book record, then LOAD FORM with: the book title, author and description
  function updateBookForm(id) {
    API.getBook(id)
      // .then((res) => console.log(res))
      .then((res) => {
        console.log(res);
        setFormObject({
          title: res.data.title,
          author: res.data.author,
          description: res.data.description,
          id: res.data._id,
        });
      })
      .catch((err) => console.log(err));
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadUserBooks())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.updateBook method to update the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      console.log("Form Object ID: ", formObject.id);
      const id = formObject.id;
      //const description = formObject.description;
      // const title = formObject.title;
      // const author = formObject.author;
      console.log("Updated Book ID: ", id);
      console.log("Updated Description: ", formObject.description);
      console.log("+++++++++++++++++++++++++++");
      API.updateBook(id, formObject)
        .then((res) => loadUserBooks())
        .catch((err) => console.log(err));
      console.log(formObject.title);
      console.log(formObject.id);
      console.log(formObject.description);
      setFormObject({
        title: "",
        author: "",
        description: "",
      });
      console.log("Form Object AFTER:");
      console.log(formObject.title);
      console.log(formObject.id);
      console.log(formObject.description);
    }
  }

  return (
    <Container fluid>
      <Nav logOut={props.logOut} />
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h2>Update Your Book Review</h2>
            <h5>
              Click on <i className="far fa-edit fa-2x"></i> next to the book
              name{" "}
            </h5>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
              defaultValue={formObject.title}
            />
            <Input
              onChange={handleInputChange}
              name="author"
              placeholder="Author (required)"
              defaultValue={formObject.author}
            />
            <TextArea
              onChange={handleInputChange}
              name="description"
              placeholder="Review (Optional)"
              value={formObject.description}
              defaultValue={formObject.description}
            />
            <FormBtn
              disabled={!(formObject.author && formObject.title)}
              onClick={handleFormSubmit}
            >
              Update Book Review
            </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h2>View All Books Recommended by {props.firstName}</h2>

            <Link to="/books">
              <h4>← Back to All Recommended Books</h4>
            </Link>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map((book) => (
                <ListItem key={book._id}>
                  <Link to={"/books/" + book._id}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
                  {"        "}
                  <UpdateBtn onClick={() => updateBookForm(book._id)} />
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

export default UserBooks;

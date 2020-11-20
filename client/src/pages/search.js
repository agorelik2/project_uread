import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { SaveBtn } from "../components/Button";
import Nav from "../components/Nav";

function Search(props) {
  const [books, setBooks] = useState("");
  const [result, setResult] = useState([]);

  // if (props.location.state !== null) {
  //   const { term } = props.location.state;
  //   console.log(term);
  // }

  // const [term, setTerm] = useState(props.location.state.term);
  console.log(props.location);
  const [searchTerm, setSearchTerm] = useState(
    props.location?.state?.term ?? ""
  );

  const apiKey = process.env.REACT_APP_API_KEY;
  console.log("User ID:");
  console.log(props.id);

  //handle change when search term is entered
  function handleChange(event) {
    const book = event.target.value;
    setBooks(book);
  }

  const searchGoogleBooks = async () => {
    console.log(books, "in search GoogleBooks function", searchTerm);
    const search = books || searchTerm;
    await axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          search +
          "&key=" +
          apiKey
      )
      .then((data) => {
        setResult(data.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handles change when search button was clicked
  function handleSubmit(event) {
    event.preventDefault();
    //console.log(books + "book from handle submit button");
    searchGoogleBooks();
  }

  function handleBookSave(index) {
    console.log(index);
    console.log(result[index].id);
    console.log(result[index]);
    API.saveFavorite({
      user: props.id,
      googleId: result[index].id,
      image: result[index].volumeInfo.imageLinks.thumbnail,
      title: result[index].volumeInfo.title,
      authors: result[index].volumeInfo.authors,
      description: result[index].volumeInfo.description,
      link: result[index].volumeInfo.previewLink,
    }).catch((err) => console.log(err));
  }

  return (
    <Container fluid>
      <Nav
        id={props.id}
        firstName={props.firstName}
        lastName={props.lastName}
      />
      <Row>
        <Col size="md-10">
          <Jumbotron className="jumbtop">
            <h1 className="search-header">Google Book Search</h1>
          </Jumbotron>
          <Input
            onChange={handleChange}
            onSubmit={handleSubmit}
            name="title"
            placeholder="Title (required)"
            defaultValue={searchTerm}
          />
          <FormBtn onClick={handleSubmit}>Search Book</FormBtn>
          {result.length ? (
            <List>
              {result.map((book, index) => {
                console.log(JSON.stringify(book, null, 2));
                return (
                  <ListItem key={book.id}>
                    <div className="book-title">
                      <strong>
                        {book.volumeInfo.title} by {book.volumeInfo.authors}
                      </strong>
                    </div>
                    <br></br>

                    <a href={book.volumeInfo.previewLink}>
                      <img
                        src={
                          book.volumeInfo.imageLinks === undefined
                            ? ""
                            : `${book.volumeInfo.imageLinks.thumbnail}`
                        }
                        alt={book.volumeInfo.title}
                      />
                    </a>
                    <p>{book.volumeInfo.description}</p>
                    <SaveBtn
                      onClick={() => handleBookSave(index)}
                      className="btn"
                    >
                      {" "}
                      Save to Favorites
                    </SaveBtn>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3> No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default withRouter(Search);

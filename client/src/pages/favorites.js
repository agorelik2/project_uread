import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import Nav from "../components/Nav";

function Favorites(props) {
  const [savedBooks, setSavedBooks] = useState([]);

  console.log("User ID:");
  console.log(props.id);
  console.log(props.firstName);
  console.log(props.lastName);

  // const { id } = useParams()
  useEffect(() => {
    loadFavorites();
  }, []);

  function loadFavorites() {
    API.getFavoritesByUser()
      .then((res) => setSavedBooks(res.data))
      .catch((err) => console.log(err));
  }

  function deleteFavorite(id) {
    API.deleteFavorite(id)
      .then((res) => loadFavorites())
      .catch((err) => console.log(err));
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
          <Jumbotron className="fluid jumbtop">
            <h1>My Favorite Books</h1>
          </Jumbotron>
          <br></br>
          <br></br>

          {savedBooks.length ? (
            <List>
              {savedBooks.map((savedBook) => (
                <ListItem key={savedBook._id}>
                  <strong className="saved-book">
                    {savedBook.title + "   "}
                    by
                    {"   " + savedBook.authors}
                  </strong>
                  <br></br>
                  <br></br>
                  <a href={savedBook.link}>
                    <img
                      src={
                        savedBook.image === undefined
                          ? ""
                          : `${savedBook.image}`
                      }
                      alt={savedBook.title}
                      // className="md"
                    />
                  </a>

                  <p className="book-description">{savedBook.description}</p>

                  <DeleteBtn onClick={() => deleteFavorite(savedBook._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h2>No Books to Display</h2>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default withRouter(Favorites);

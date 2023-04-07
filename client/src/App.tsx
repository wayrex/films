import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Cards from "./components/MovieCards/Cards";

import './App.scss';
import Film from './intefaces/Film';
import AddFilm from './components/AddFilm/Add';
import { Console } from 'console';

interface AppProps {
}

interface AppState {
  error: string | null;
  isLoaded: boolean;
  films: Film[];
}

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      films: []
    };
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_SERVER_URL + "/films")
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            films: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const films = this.state.isLoaded ?
    <Cards films={this.state.films}/> :
    <Spinner animation="border" variant="primary" role="status">
    <span className="visually-hidden">Loading...</span>
    </Spinner>
    return (
      <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <h1 className="header">Movie wishes</h1>
            <AddFilm/>
            {films}
          </Container>
        </Container>
      );
  }
}

export default App;

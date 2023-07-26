import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface AddFilmProps {
  reloadFilms: () => void
  isLoaded: (isLodaded: boolean) => void,
}

interface AddFilmState {
}

class AddFilm extends Component<AddFilmProps, AddFilmState> {
  constructor(props: any) {
    super(props);
  }

  state = {
    url: "",
  }

  addFilmData = () => {
    const filmUrl = this.state.url;
    this.setState({
      url: ""
    });
    this.props.isLoaded(false);
    axios.post(process.env.REACT_APP_SERVER_URL + "/films/url", {
      url: filmUrl
    })
      .then(
        (result) => {
          this.props.reloadFilms();
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  };

  render() {
      return (
          <>
            <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Film url"
                  aria-label="Film url"
                  aria-describedby="basic-addon"
                  value={this.state.url}
                  onChange={e => this.setState({ url: e.target.value })}
                />
              <Button variant="outline-success" id="button-addon" onClick={this.addFilmData}>
                Add Film
              </Button>
            </InputGroup>
          </>
      )
  }
}

export default AddFilm;
import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
class AddFilm extends Component {
  constructor(props: any) {
    super(props);
  }

  state = {
    url: "",
  }

  addFilmData = () => {
    const filmUrl = this.state.url;
    this.setState({
      isLoaded: false,
      url: ""
    });
    axios.post(process.env.REACT_APP_SERVER_URL + "/films/url", {
      url: filmUrl
    })
      .then(
        (result) => {
          this.setState({
            isLoaded: true
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
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
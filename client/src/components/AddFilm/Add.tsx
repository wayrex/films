import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
class AddFilm extends Component {
  constructor(props: any) {
    super(props);
  }

  addFilmData = () => {
    this.setState({
      isLoaded: false
    });
    axios.post(process.env.REACT_APP_SERVER_URL + "/films/url", {
      url: "https://www.imdb.com/title/tt15301048/?ref_=nv_sr_srsg_2"
    })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
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
                placeholder="Film link"
                aria-label="Film link"
                aria-describedby="basic-addon"
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
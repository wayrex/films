import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function AddMovieButton() {
    return (
        <>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Film link"
              aria-label="Film link"
              aria-describedby="basic-addon"
            />
            <Button variant="outline-success" id="button-addon">
              Add Film
            </Button>
          </InputGroup>
        </>
    )
}
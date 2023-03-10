import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Film from '../../intefaces/Film';
import Col from 'react-bootstrap/Col';

interface MovieFilmProps {
  film: Film
}

export function MovieCard(props: MovieFilmProps) {
  const film = props.film;
    return (
      <Col>
        <Card style={{ width: '20rem' }}>
          <Card.Img style={{ minHeight: '30rem', objectFit: 'contain' }} variant="top" src={film.image} />
          <Card.Body>
            <Card.Title>{film.title}</Card.Title>
            <Card.Text>
              {film.genres.join(', ')}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
}
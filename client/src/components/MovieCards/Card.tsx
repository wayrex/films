import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Film from '../../intefaces/Film';

interface MovieFilmProps {
  film: Film
}

export function MovieCard(props: MovieFilmProps) {
  const film = props.film;
    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{film.title}</Card.Title>
          <Card.Text>
            {film.genres.join(', ')}
          </Card.Text>
        </Card.Body>
      </Card>
    )
}
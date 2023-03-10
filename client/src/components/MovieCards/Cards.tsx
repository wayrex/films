import React, { Component } from 'react';
import Film from '../../intefaces/Film';
import { MovieCard } from './Card';
import Row from 'react-bootstrap/Row';

import './Cards.scss';



interface CardsProps {
    films: Film[]
}

interface CardsState {
}

class Cards extends Component<CardsProps, CardsState> {
    constructor(props: any) {
    super(props);
  }

    render() {
        return (
            <Row xs={1} md={3} className="g-4">
                {this.props.films.map((film, index) => <MovieCard key={index} film={film}/>)}
            </Row>
        );
    }
}

export default Cards;

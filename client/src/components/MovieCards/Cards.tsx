import React, { Component } from 'react';
import Film from '../../intefaces/Film';
import { MovieCard } from './Card';

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
            <>
            {this.props.films.map((film, index) => <MovieCard key={index} film={film}/>)}
            </>
        );
    }
}

export default Cards;

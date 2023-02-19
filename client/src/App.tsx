import React, { Component } from 'react';
import { Movie } from "./features/Movie/Movie";

import './App.scss';
import Spinner from 'react-bootstrap/Spinner';
function App() {
  return (
    <div className="App">
      <div className="container is-max-desktop">
        <Movie />
      </div>
    </div>
  );
}

export default App;

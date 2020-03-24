import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';

// Waits for promise before rendering App
axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    ReactDOM.render(
      <React.StrictMode>
        <App countries={response.data} />
      </React.StrictMode>,
      document.getElementById('root')
    );
    })




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionsAndAnswers = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:5001/api/preguntas/ids').then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Clicker Game</h1>
      <p>Score: {score}</p>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
};

export default ClickerGame;
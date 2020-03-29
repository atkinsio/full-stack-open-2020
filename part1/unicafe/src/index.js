import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ text,  handleClick }) => (
  <button onClick={handleClick}><strong>{text}</strong></button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td><strong>{text}:</strong></td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / total
  const positive = good * 100 / total
  
  return (total === 0)
    ? (
      <div>
        <div>
          <h2>Statistics</h2>
        </div>
        <div>
          <p>No feedback given</p>
        </div>
      </div>
  ) 
  : (
    <div>
      <div>
        <h2>Statistics</h2>
      </div>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={total} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive + "%"} />  
        </tbody>
      </table>  
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <div>
          <h1>Give Feedback</h1>
          <hr />
        </div>
        <div>
          <Button text="Good" handleClick={() => setGood(good + 1)} />{' '}
          <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />{' '}
          <Button text="Bad" handleClick={() => setBad(bad + 1)} />
        </div>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
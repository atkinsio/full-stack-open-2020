import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Button = ({ text,  handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / total
  const positive = good * 100 / total
  
  return (total === 0)
    ? (
      <div>
        <div>
          <h1>statistics</h1>
        </div>
        <div>
          <p>No feedback given</p>
        </div>
      </div>
  ) 
  : (
    <div>
      <div>
        <h1>statistics</h1>
      </div>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive + "%"} />  
        </tbody>
      </table>  
    </div>
  );
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <div>
          <h1>give feedback</h1>
        </div>
        <div>
          <Button text="good" handleClick={() => setGood(good + 1)} />
          <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
          <Button text="bad" handleClick={() => setBad(bad + 1)} />
        </div>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
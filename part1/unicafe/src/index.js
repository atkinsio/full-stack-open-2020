import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / total
  
  return (total === 0)
    ? (
      <>
        <div>
          <h1>statistics</h1>
        </div>
        <div>
          <p>No feedback given</p>
        </div>
      </>
  ) 
  : (
    <>
      <div>
        <h1>statistics</h1>
      </div>
      <div>
        <pre>
          good {good} {"\n"}
          neutral {neutral} {"\n"}
          bad {bad} {"\n"}
          all {total} {"\n"}
          average {average}
        </pre>
      </div>
    </>
  );
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
      </div>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
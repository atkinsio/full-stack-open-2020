import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad

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
      <div>
        <h1>statistics</h1>
      </div>
      <div>
        <pre>
          good {good} {"\n"}
          neutral {neutral} {"\n"}
          bad {bad} {"\n"}
          all {total} {"\n"}
          average {((good * 1) + (neutral * 0) + (bad * -1)) / total}
        </pre>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
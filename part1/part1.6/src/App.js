import React, { useState } from 'react'
//exercises 1.6-1.11
const Statictic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given!</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statictic text="Good:" value={good} />
          <Statictic text="Neutral:" value={neutral} />
          <Statictic text="Bad:" value={bad} />
          <Statictic text="All:" value={total} />
          <Statictic text="Average:" value={(good - bad) / total} />
          <Statictic text="Positive:" value={good / (total) * 100} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )

}

const App = () => {

  // save clicks of each button to its own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const raiseGood = () => { setGood(good + 1) }
  const raiseNeutral = () => { setNeutral(neutral + 1) }
  const raiseBad = () => { setBad(bad + 1) }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="Good" onClick={raiseGood} />
      <Button text="Neutral" onClick={raiseNeutral} />
      <Button text="Bad" onClick={raiseBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
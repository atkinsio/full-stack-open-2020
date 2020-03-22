import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  )
}

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Part = ({ part, exercises}) => {
  return (
      <p>
        {part} {exercises}
      </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map( part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <>
      <Course course={course} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
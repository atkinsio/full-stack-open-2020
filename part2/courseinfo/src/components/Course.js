import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  )
}

const Content = ({ course }) => {
  const totalExcercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      {course.parts.map( part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
      <p>
        <strong>Number of exercises {totalExcercises}</strong>
      </p>
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

export default Course
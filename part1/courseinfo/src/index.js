import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
    <hr />
  </div>
);

const Part = (props) => (
    <p>
      <strong>{props.part}:</strong> {props.exercises}
    </p>
);

const Content = (props) => (
  <div>
    <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
    <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
    <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
  </div>
);


const Total = (props) => (
  <div>
    <p><strong>Total number of exercises:</strong> {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  </div>
);


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
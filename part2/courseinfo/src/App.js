import React from 'react';
import Course from './components/Course';

const App = ({ courses }) => (
  <>
    <div>
      <h1>Web Development Curriculum</h1>
    </div>
    <hr />
    {courses.map( course => <Course key={course.id} course={course} />)}
  </>
)


export default App;


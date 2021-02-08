import React from 'react'
const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => <p><b>Total of {parts.reduce(reducer, 0)} exercises</b></p>
//const Total = ({parts}) => <p>Number of exercises {parts.reduce(function(accumulator, currentValue) { return accumulator + currentValue.exercises }, 0)}</p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises;
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
        {course.parts.map(parts =>
          <Part key={parts.id} part={parts} />
        )
        }
      <Total parts={course.parts} />
    </div>
  )

}

export default Course
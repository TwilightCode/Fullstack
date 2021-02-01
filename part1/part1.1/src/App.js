import React from 'react'
//Exercises 1.1-1.5
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}


const Content = (props) => {
  return (

    /* exercise 1.1
    <div>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
       {props.part3} {props.exercises3}
      </p>
    </div>
    */

    // exercise 1.2
    /*{ <div>
      <Part part={props.part1} exercises={props.exercises1}/>
      <Part part={props.part2} exercises={props.exercises2}/>
      <Part part={props.part3} exercises={props.exercises3}/>
    </div> }*/
    //end of exercise 1.2 changes.
    <div>
      <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
      <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
      <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
    </div>
  )
}


const Total = (props) => {
  /* 
  //exercise prior 1.3
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  ) */
  return (
    <div>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </div>
  )
}


const App = () => {
  /*
   //used in exercises [1.1-1.2]
   const course = 'Half Stack application development'
   const part1 = 'Fundamentals of React'
   const exercises1 = 10
   const part2 = 'Using props to pass data'
   const exercises2 = 7
   const part3 = 'State of a component'
   const exercises3 = 14
 */
  const course = {
    course: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },

      {
        name: 'Using props to pass data',
        exercises: 7,
      },

      {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  }
  /*
  exercise 1.2
  return (
   <div>
    <Header course={course} />
    <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
   </div>
   
  ) */
  //exercises 1.3-1.5
  return (
    <div>
      <Header course={course.course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
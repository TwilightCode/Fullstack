import React, { useState, useEffect } from 'react'

import personService from './services/persons'

import './App.css'

const NewPerson = ({ name, number, persons, newPersons, newName, newNumber, setError }) => {
  const handleNewName = (event) => {
    console.log(event.target.value)
    newName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    newNumber(event.target.value)
  }

  const AddName = (event) => {
    event.preventDefault()
    console.log("text:", newName);
    const personObject = {
      name: name,
      number: number,
    }
    if (!persons.find(person => { return person.name == name })) {
      //onsole.log(persons.find(person=> person.name== newName));
      newPersons(persons.concat(personObject))
      personService
        .create(personObject)
        .then(response => {
          newPersons(persons.concat(response.data))
          console.log("POST response ", response)
        })
      newName('')
      newNumber('')
      setError(
        `Added person '${personObject.name}' `)
      setTimeout(() => {
        setError(null)
      },
        5000)
    } else {
      if (window.confirm("Name already exist do you want to change the number?")) {
        const nperson = persons.find(person => { return person.name == name })
        personService
          .update(nperson.id, personObject)
          .then(() => {
            personService
              .getAll()
              .then((response) => {
                newPersons(response.data)
              })
          })
        setError(
          `''Changed number of '${nperson.name}' `)
        setTimeout(() => {
          setError(null)
        },
          5000)
      }
    }
  }

  return (
    <form onSubmit={AddName}>
      <div>
        name: <input onChange={handleNewName} />
      </div>
      <div>
        number: <input onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Search = ({ showAll, searchTerm }) => {
  const search = (event) => {
    //console.log(event.target.value)
    if (searchTerm == '') {
      showAll(true)
    } else {
      showAll(false)
    }

    searchTerm(event.target.value)
  }
  return (
    <div>
      Search: <input onChange={search} />
    </div>
  )
}

const PersonList = ({ persons, showAll, searchTerm, newPersons, setError}) => {
  const RemovePerson = (event) => {
    // if(window.confirm("Do you want to remove name")){
    console.log(event.target.value)
    personService
      .deleteP(event.target.value)
      .then(() => {
        personService
          .getAll()
          .then((response) => {
            newPersons(response.data)
          })
      }).catch(error => {
        setError(
          `Note was already removed from server`
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
      )}
  
  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    return (
      personsToShow.map(persons => {
        return (
          <p key={persons.name}>{persons.name}, {persons.number} <button value={persons.id} onClick={RemovePerson}>delete</button> </p>
        )
      }
      )
    )
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="confirm">
        {message}
      </div>
    )
  }

  const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    useEffect(() => {

      //console.log('effect')
      personService
        .getAll()
        .then(response => {
          //console.log('promise fulfilled')
          // console.log(response.data);
          setPersons(response.data)
        })
    }, []
    )
    //console.log('render', persons.length, 'persons')


    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={errorMessage} />
        <div>
          <Search showAll={(show) => { setShowAll(show) }} searchTerm={(term) => { setSearchTerm(term) }} />
          <NewPerson
            name={newName}
            number={newNumber}
            persons={persons}
            newPersons={(persons2) => {
              setPersons(persons2)
            }}
            newName={(name) => {
              setNewName(name)
            }}
            newNumber={(number) => {
              setNewNumber(number)
            }}
            setError={(error) => {
              setErrorMessage(error)
            }} />
        </div>

        <h2>Numbers</h2>
        <PersonList persons={persons} showAll={showAll} searchTerm={searchTerm} newPersons={(persons2) => { setPersons(persons2) }} setError={(error) => {
              setErrorMessage(error)
            }}/>

      </div>
    )
  }

  export default App
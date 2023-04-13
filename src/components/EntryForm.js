import { useState } from 'react'
import personsService from '../services/persons'

const EntryForm = ({persons, setPersons, setSearchPersons, setNotificationMessage, setIsErrorNotification}) => {
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneNumberChange = (event) => {
        setNewPhoneNumber(event.target.value)
    }

    function refreshPersonsList() {
        console.log('refreshing person list')
        personsService
            .getAll()
            .then(allPersons => {
                console.log('new all persons', allPersons)
                setPersons(allPersons)
                setSearchPersons(allPersons)
            })
    }
    
    const addNewPerson = (event) => {
        event.preventDefault()
        var matchingPerson = findMatchingPerson()
        if(matchingPerson) {
            if(window.confirm(`${newName} already exists in phonebook. Update number ${matchingPerson.number} to ${newPhoneNumber}?`)) {
                const updatedPersonObject = {...matchingPerson, number: newPhoneNumber}
                personsService
                    .update(matchingPerson.id, updatedPersonObject)
                    .then(() => {
                        setNotificationMessage(
                          `Person '${matchingPerson.name}' successfully updated`
                        )
                        setIsErrorNotification(false)
                        refreshPersonsList()
                        setTimeout(() => {
                            setNotificationMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setNotificationMessage(
                            error.response.data.error
                          )
                          setIsErrorNotification(true)
                          refreshPersonsList()
                          setTimeout(() => {
                              setNotificationMessage(null)
                          }, 5000)
                    })
                // setPersons(persons.concat(updatedPersonObject))
                setNewName('')
                setNewPhoneNumber('')
            }
        } else {
            const newPersonObject = {
                name: newName,
                number: newPhoneNumber
            }
            personsService
                .create(newPersonObject)
                .then(() => {
                    setNotificationMessage(
                      `Person '${newName}' successfully added`
                    )
                    setIsErrorNotification(false)
                    refreshPersonsList()
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setNotificationMessage(
                        error.response.data.error
                      )
                      setIsErrorNotification(true)
                      refreshPersonsList()
                      setTimeout(() => {
                          setNotificationMessage(null)
                      }, 5000)
                })
            // setPersons(persons.concat(newPersonObject))
            setNewName('')
            setNewPhoneNumber('')
        }
    }

    const findMatchingPerson = () => {
        var matchingPerson
        persons.forEach(person => {
            if(person.name.toLowerCase() === newName.toLowerCase()) {
                matchingPerson = person
            }
        });
        return matchingPerson
    }
    
    return (
        <div>
            <h2>add new entry</h2>
            <form onSubmit={addNewPerson}>
                <div>
                name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                phone: <input value={newPhoneNumber} onChange={handlePhoneNumberChange}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )

}
export default EntryForm
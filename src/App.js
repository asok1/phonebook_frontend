import { useState, useEffect } from 'react'
import DisplayEntries from './components/DisplayEntries'
import EntryForm from './components/EntryForm'
import Search from './components/Search'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [searchPersons, setSearchPersons] = useState([]) 
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isErrorNotification, setIsErrorNotification] = useState(true)
  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
        setSearchPersons(response)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isErrorNotification}/>

      <Search persons={persons} setSearchPersons={setSearchPersons}/>

      <EntryForm 
                persons={persons} 
                setPersons={setPersons} 
                setSearchPersons={setSearchPersons} 
                setNotificationMessage={setNotificationMessage}
                setIsErrorNotification={setIsErrorNotification}
      />

      <DisplayEntries searchPersons={searchPersons} 
                      setPersons={setPersons} 
                      setSearchPersons={setSearchPersons} 
                      setNotificationMessage={setNotificationMessage}
                      setIsErrorNotification={setIsErrorNotification}
      />
    </div>
  )
}

export default App
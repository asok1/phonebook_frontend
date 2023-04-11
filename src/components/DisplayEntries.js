import personsService from '../services/persons'


const DisplayEntries = ({ searchPersons, setPersons, setSearchPersons, setNotificationMessage, setIsErrorNotification}) => {
    console.log('display', searchPersons)


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
    

    return(
        <div>
            <h2>Numbers</h2>
            <ul>
                {searchPersons.map((person, i) => 
                    <li key={i}>
                        <div>{person.name} {person.number}</div>
                        <button type="submit"
                            onClick={() => {
                                console.log('deleting', person.name)
                                if(window.confirm(`Are you sure you want to delete ${person.name} from the phonebook?`)) {
                                    personsService.deletePerson(person.id)
                                        .then(() => {
                                            setNotificationMessage(
                                              `Person '${person.name}' successfully deleted`
                                            )
                                            setIsErrorNotification(false)
                                            refreshPersonsList()
                                            setTimeout(() => {
                                                setNotificationMessage(null)
                                            }, 5000)
                                        })
                                        .catch(error => {
                                            setNotificationMessage(
                                              `Person '${person.name}'  was already deleted`
                                            )
                                            setIsErrorNotification(true)
                                            refreshPersonsList()
                                            setTimeout(() => {
                                                setNotificationMessage(null)
                                            }, 5000)
                                        })
                                }
                            }}
                            >delete</button>
                    </li>
                )}
            </ul>
        </div>
    )
}
export default DisplayEntries
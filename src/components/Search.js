import { useState } from 'react'

const Search = ({persons, setSearchPersons}) => {

  const [searchName, setSearchName] = useState('')

  const handleSearchByName = (event) => {
    var searchName = event.target.value
    console.log('search name:', searchName, searchName.length)
    setSearchName(searchName)
    const isSearch = !searchName.length > 0
    setSearchPersons(isSearch
        ? [...persons]
        : persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase())))
  }

    return (
        <div>
        name: <input type="search" value={searchName} onChange={handleSearchByName}/>
        </div>
    )
}

export default Search
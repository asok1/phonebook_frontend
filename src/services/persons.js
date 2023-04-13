import axios from 'axios'
const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL

const getAll = () => {
  console.log('env', process.env.NODE_ENV)
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}
const personsService = { 
  getAll, 
  create, 
  update,
  deletePerson
}

export default personsService
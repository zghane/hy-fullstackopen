import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
        return axios.get(baseUrl).then(response => response.data)
}

const create = (newPerson) => {
        return axios.post(baseUrl, newPerson).then(response => response.data)
}

const update = (id, newPerson) => {
        return axios.put(`${baseUrl}/${id}`, id).then(response => response.data)
}

// note; no need to name object fields e.g. getAll: getAll (ES6)
//export default {getAll, create, update}
const personService = {getAll, create, update}
export default personService

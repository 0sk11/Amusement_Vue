import axios from 'axios'
const BASE_URL = 'http://localhost:9000'

class UserService{
    getUsers(){
        return axios.get(`${BASE_URL}/users`)
    }
    editUsersById(id,user){
        return axios.put(`${BASE_URL}/user/${id}`,user)
    }
}

export default new UserService()
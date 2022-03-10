import axios from 'axios'
const BASE_URL = 'http://localhost:9000'

class OrderService{
    getRideTypes(rideType){
        // console.log(`${BASE_URL}/rides/${rideType}`)
       return axios.get(`${BASE_URL}/rides-types/${rideType}`)
    }
    postOrder(user){
        return axios.post(`${BASE_URL}/user`,user)
    }
    deleteOrder(userId){
        return axios.delete(`${BASE_URL}/user/${userId}`)
    }
}

export default new OrderService()
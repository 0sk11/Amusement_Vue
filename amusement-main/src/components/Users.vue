<template>
  <h1>Users Working</h1>
  <div>
  <table class="table">
    <thead class="table-primary">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Age</th>
        <th scope="col" id="rides">Rides</th>
        <th scope="col">Total Rides</th>
        <th scope="col">Total Cost</th>
        <th scope="col">Type Of Rides</th>
        <th scope="col">Actions</th>
        <th scope="col">Generate Bill</th>
      </tr>
    </thead>
    <tbody v-for="user of users" :key="user.id">
      <tr>
        <th scope="row">{{user.id}}</th>
        <td>
          <span v-if="edit!=user.id">
            {{user.name}}
          </span>
          <div v-else>
            <input type="text"  v-model.trim="user.name">
          </div>
          </td>
        <td>
          <span v-if="edit!=user.id">
            {{user.age}}
          </span>
          <div v-else>
            <input type="number"  v-model.number="user.age">
          </div>
        </td>
        <td>
            <span v-for="ride of user.rideName" :key="ride" class="pill">{{ride}} &nbsp;</span>
        </td>
        <td>{{user.noOfRide}}</td>
        <td>&#8377; {{user.totalCost}}</td>
        <td>
            <span v-for="rideType of user.rideType" :key="rideType" class="pill">{{rideType}} &nbsp;
          </span>
        </td>
        <td>
        <font-awesome-icon icon="pen" class="icon pen" v-if="edit!=user.id" @click="alter(user.id)"/>
        <font-awesome-icon icon="check" class ="icon confirm" v-else @click="confirm(user)"/>
        &nbsp;<font-awesome-icon icon="trash" class="trash" @click="deleteUser(user.id)"/>
        </td>
        <td>
          <font-awesome-icon icon="file-invoice" class="confirm icon" @click="generateBill(user)" v-if="!user.afterGSTCost"/>
          <font-awesome-icon icon="eye" class="confirm icon"  v-else/>
        </td>
      </tr>
    </tbody>
  </table>
    {{users}}
  </div>
</template>

<script>
import UserService from '../services/UsersService'
import OrderingService from '../services/OrderingService'
export default {
  
  name: 'Users',
  data(){
    return{
       users : [],
       edit : true,
       user : {
         name : "",
         age : 10
       }
    }
  },
  methods:{
    alter(id){
      this.edit = id
      // this.user.name = user.name;
      // this.user.age = user.age;
    },
    confirm(user){
      this.edit =! this.edit
      if(this.user.name !==""){
         this.user.name = user.name
      }
      if(this.user.age !==0){
        this.user.age = user.age 
      }
      UserService.editUsersById(user.id,user)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err))
      

      // console.log(user)
    },
    deleteUser(id){
      console.log(id)
      OrderingService.deleteOrder(id)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
    },
    generateBill(user){
      const gst = 1.2;
      user.afterGSTCost = user.totalCost*gst      
      UserService.editUsersById(user.id,user)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err))
    }
  },
  props: {
    msg: String
  },
  beforeCreate(){
    UserService.getUsers().then(res=>this.users = [... res.data])
    .catch(err=>console.log(err))
    // console.log(this.users)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.icon,.trash{
  cursor: pointer;
}
.pen:hover{
  color: rgb(29, 118, 219);
}

#rides{
  width: 300px;
}
.confirm:hover{
  color: #42b983;
}

.trash:hover{
  color: red;
}
.pill{
    background-color: #cfe2ff;
    padding: 5px 8px;
    margin: 5px;
    border-radius: 30%;
    text-align: center;
}
</style>

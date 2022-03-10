<template>
  <h1>Booking</h1>
  <form >
      <label>Name</label>
      <input type="text" name="" v-model.trim.lazy="order.name" @change="validate">

      <label>Age</label>
      <input type="number" maxlength="3" v-model.number.lazy="order.age" @change="validate">

      <label>Ride Type</label>
      <select v-model="rt" @change="getRideName" >
          <option value="land">land</option>
          <option value="water">water</option>
      </select>

      <!-- <select v-model="rideType"  >
          <option value="ride" v-for="ride in rides" :key="ride.id">{{ride.name}} : Price {{ride.cost}}</option>
      </select> -->
      <div class="rides" v-if="rides">
            <div v-for="ride in rides" :key="ride.id" class="ride">
                <h4>{{ride.name}}</h4>
                <h5>{{ride.type}}</h5>
                <p>{{ride.cost}}</p>
                <div class="btns">
                    <button @click="increment(ride)" class="btn primary"><font-awesome-icon icon="circle-plus" /></button>
                    <button @click="decrement(ride)" class="btn danger"><font-awesome-icon icon="circle-minus" /></button>
                </div>
                
            </div>
      </div>    
    <div>
        <button class="primary" @click="postData" :disabled="btnDisable">Confirm</button>
        <button class="danger" @click="reset">Reset</button>
    </div>
    
  </form>

  <p v-if="rides">{{rides}}</p>
</template>

<script>
import OrderService from '../services/OrderingService'
import RemoveDuplicates from '../services/RemoveDuplicates'
export default {
    name:'Booking',
    data(){
        return {        
            order : {
                name : '',
                age : null,
                rideType : [],
                rideName : [],
                noOfRide:0,
                totalCost:0
            },
            totalRide:0,
            rides:[],
            rt : null,
            btnDisable:true
        }
    },
    methods:{
        getRideName(e){
            // console.log(e.target.value)
            
           this.rides = OrderService.getRideTypes(e.target.value)
           .then(res=>this.rides=res.data).catch(err=>console.log(err.data))
           console.log(this.rides)
        },
        reset(){
            this.order.name = [],
            this.order.age = null,
            this.order.rideType = [],
            this.order.rideName = '',
            this.order.noOfRide = 0,
            this.order.totalCost = 0
        },
        validate(){
           if(this.order.age!=0 && this.order.name) return this.btnDisable=false;
           return this.btnDisable=true;
        },
        increment(item){
            // if(noOfRide === 6) return;
            this.order.rideType.push(this.rt)
            // this.order.rideType = RemoveDuplicates(this.order.rideType)
            this.order.rideName.push(item.name)
            // this.order.rideName = RemoveDuplicates(this.order.rideName)
            this.order.totalCost += item.cost
            this.order.noOfRide += 1;
            console.log(this.order)
        },
        decrement(item){
            if(this.order.rideName === 1){
                this.order.rideName = []
                this.order.rideType = []
                this.order.totalCost = 0
                this.order.noOfRide  = 0
            }else{
                for(let i=0;i<this.order.rideName.length;i++){
                    if(this.order.rideName[i]===item.name){
                        this.order.rideName.splice(i,1);
                        break;
                    }
                }
                // console.log(this.order.rideName)
                this.order.totalCost -= item.cost
                this.order.noOfRide -= 1;
            }
            
            console.log(this.order)
        },
        postData(){
            this.order.rideName = RemoveDuplicates(this.order.rideName)
            this.order.rideType = RemoveDuplicates(this.order.rideType)
            OrderService.postOrder(this.order)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
            this.reset();
        }
    }
}
</script>

<style>
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 480px;
    margin:30px auto;
    background: rgb(238, 235, 235);
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}

label{
    color: #aaa;
    display: inline-block;
    margin: 25px 0 25px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

input,select{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}

button{
    padding: 8px;
    margin: 30px 5px;
    border-radius: 5px;
    border:none;
    cursor:pointer;
}

button:disabled{
    background-color: #eee;
    color:#000;
    cursor: auto;
}

.danger{
    background-color: rgb(216, 65, 19);
    color: #fff;
}

.primary{
    background-color: rgb(50, 50, 168);
    color: #fff;
}
.rides{
    flex-wrap: wrap;
    display: flex;
    justify-content: space-evenly;
    margin: 15px 2px;
}

.ride {
    text-align: center;
    border: 2px solid #00000021;
    border-radius: 5px;
    margin: 10px;
    box-shadow:  5px 5px 3px 0 rgba(54, 54, 54, 0.103);
    width: 160px;
}

.ride h1{
    text-transform: uppercase;
}
.ride h5{
    color: #555;
}
.btns{
    margin:5px;
}
.btn{
    margin: 10px;
    padding: 5px 12px ;
}

</style>
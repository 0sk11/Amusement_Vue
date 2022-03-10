<template>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
  <div id="nav">
    <router-link to="/users">Users</router-link>
    <router-link to="/book">Book</router-link>
  </div>
  <router-view/>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 80%;
  margin: 0 auto;
}

#nav {
  display: flex;
  justify-content: space-around;
  background-color: rgb(165, 162, 162);
  padding: 30px;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: #fff;
}

#nav a.router-link-exact-active {
  color: #252927;
}
</style>

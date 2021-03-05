<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--      <div>huy</div>-->
<!--    </div>-->
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  border: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: lightslategray;
  width: 100vw;
  height: 100vh;
  margin: auto;
  @media (min-width: 1440px) {
    width: 70vw;
  }

}
</style>

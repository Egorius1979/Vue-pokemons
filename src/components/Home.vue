<template>
  <div class="main-page">
    <div class="welcome">
      <h2>Welcome to the</h2>
      <img src="../assets/Pokémon_logo1.png" alt="" class="poke-logo" />
      <h2>page, guys!!!</h2>
    </div>
    <router-link to="/list">
      <button class="enter-btn">Enter 18+</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped lang="scss">
.main-page {
  padding-top: 30vh;
}

.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
}

.poke-logo {
  width: 50%;
  margin-bottom: 30px;
  @media (min-width: 1024px) {
    width: auto;
  }
}

.enter-btn {
  cursor: pointer;
  border-radius: 5px;
  margin-top: 50px;
  padding: 20px 60px;
  font-size: 56px;
  outline: black;
  border: 1px solid darkred;
  background-color: #4dc0b5;

  &:hover {
    background-color: greenyellow;
    border: 10px solid rebeccapurple;
    color: darkred;
  }
}
</style>

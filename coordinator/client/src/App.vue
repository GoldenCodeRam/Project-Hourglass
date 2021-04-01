<template>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #fff1df;
  background-image: radial-gradient(#2d363809 1px, transparent 1px),
    radial-gradient(#2d363809 1px, #ffffff 1px);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
}

body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

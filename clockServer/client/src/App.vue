<template>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
@import "./components/colors.scss";

html {
  width: 100%;
  height: 100%;
  background: $background;
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

button.option {
  outline: none;
  background: $background-50;
  border-radius: 5px;
  padding: 0.4em 2em;
  font-size: 12pt;
  font-weight: 700;
  font-family: "Rubik", sans-serif;
  color: $white;
  margin: 0em 0.3em 1em 0.3em;

  outline: none;
  border: none;

  &:hover {
    background: $foreground;
  }
  &:active {
    background: $background-25;
  }

  &.yes:hover {
    background: $green-25;
  }
  &.yes:active {
    background: $green-50;
  }

  &.no:hover {
    background: $red-25;
  }
  &.no:active {
    background: $red-50;
  }
}
</style>

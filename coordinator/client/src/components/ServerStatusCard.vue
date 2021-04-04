<template>
  <div class="background">
    <div class="container">
      <p>{{serverName}}</p>
      <div class="status online" v-if="isServerUp">
        <i class="fas fa-check-square"></i>
        <p>Server online</p>
      </div>
      <div class="status offline" v-if="!isServerUp">
        <i class="fas fa-times-square"></i>
        <p>Server offline</p>
      </div>
      <button class="option yes" @click="goToServer">Go to server 🏃‍♂️</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    serverName: String,
    clientPort: Number,
    isServerUp: Boolean,
  },
  setup(props: any) {
    function goToServer() {
      window.open(`http://localhost:${props.clientPort}`, "_blank");
    }

    return {
      goToServer,
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./colors.scss";

.background {
  .container {
    display: inline-block;
    padding: 1em 1em;
    margin: auto auto;
    background: $foreground-25;
    border-radius: 5px;

    p {
      margin: 0em 1em 1em 1em;
      padding: 0;
      font-family: "Rubik", sans-serif;
      font-weight: bold;
      font-size: 14pt;
      color: $purple;
    }

    .status {
      i {
        font-size: 32pt;
      }
      p {
        margin: 0 0 1em 0;
        font-size: 12pt;
      }
      &.online {
        i, p {
          color: $green;
        }
      }
      &.offline {
        i, p {
          color: $red;
        }
      }
    }
  }
}
</style>

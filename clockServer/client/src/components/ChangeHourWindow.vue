<template>
  <div class="background">
    <div class="container" id="container">
      <button class="exit-button" @click="hideWindow">
        <i class="fas fa-times" />
      </button>
      <p class="title">Change hour</p>
      <div class="message">
        <p>HH:MM:SS</p>
        <div>
          <input type="text" maxlength="2" size="2" placeholder="00" v-model="hours"/>
          <input type="text" maxlength="2" size="2" placeholder="00" v-model="minutes"/>
          <input type="text" maxlength="2" size="2" placeholder="00" v-model="seconds"/>
        </div>
      </div>
      <p class="buttonWarning">Are you sure you want to change the hour?</p>
      <div class="button-container">
        <button class="option yes" @click="setServerHour(hours, minutes, seconds)">YES</button>
        <button class="option no" @click="hideWindow">NO</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity';
export default {
  emits: ["hide-window", "set-server-hour"],
  methods: {
    hideWindow(): void {
      this.$emit("hide-window");
    },
    setServerHour(hours: number, minutes: number, seconds: number): void {
      this.$emit("set-server-hour", hours, minutes, seconds);
    },
  },
  setup() {
    const hours = ref<number>();
    const minutes = ref<number>();
    const seconds = ref<number>();

    return {hours, minutes, seconds};
  },
  mounted(): void {
    function dragElement(element: HTMLDivElement) {
      let posx1: number, posy1: number, posx2: number, posy2: number;

      element.onmousedown = dragMouseDown;

      function dragMouseDown(event: MouseEvent) {
        posx2 = event.clientX;
        posy2 = event.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(event: MouseEvent) {
        event = event || window.event;
        posx1 = posx2 - event.clientX;
        posy1 = posy2 - event.clientY;
        posx2 = event.clientX;
        posy2 = event.clientY;

        element.style.left = element.offsetLeft - posx1 + "px";
        element.style.top = element.offsetTop - posy1 + "px";
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }

    dragElement(document.getElementById("container") as HTMLDivElement);
  },
};
</script>

<style lang="scss" scoped>
@import "./colors.scss";

div.background {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: $background-25;
  z-index: 100;
}
div.container {
  display: inline-block;
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0em 0.5em;
  margin: auto auto;
  width: 24em;
  border-radius: 5px;
  background: $background;
  box-shadow: 3px 3px 5px $background-50;
}

div.message {
  user-select: none;
  display: flex;
  flex-direction: column;
  background: $background-50;
  padding: 1em 2em;
  margin: 1em auto;
  border-radius: 5px;
  justify-content: center;

  p {
    font-family: "Rubik", sans-serif;
    font-weight: bold;
    margin: 0 0 0.3em 0;
    color: $blue;
  }

  input {
    background: $foreground;
    margin: 0 0.2em;
    font-family: "Rubik", sans-serif;
    padding: 1em;
    text-align: center;
    color: $white;
    border: none;
    outline: none;
  }
}
p.buttonWarning {
  margin: 0.5em;
  color: $white-50;
}
p.title {
  padding: 0.2em 2em;
  color: $cyan;
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  font-size: 18pt;
}

button.exit-button {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0.5em;
  padding: 0.3em 0.6em;
  background: $background-50;

  outline: none;
  border: none;
  border-radius: 5px;

  i {
    color: $red;
  }
}
button.exit-button:hover {
  background: $red-25;
}
button.exit-button:active {
  background: $red-50;
}
</style>
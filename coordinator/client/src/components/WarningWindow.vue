<template>
  <div class="background">
    <div class="container" id="container">
      <button class="exit-button" @click="hideWarning">
        <i class="fas fa-times" />
      </button>
      <p class="warning-title">Warning Window</p>
      <p class="warning-message">This is a warning window</p>
      <div class="button-container">
        <button class="option yes">YES</button>
        <button class="option no" @click="hideWarning">NO</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['hide-warning-window'],
  methods: {
    hideWarning(): void {
      this.$emit('hide-warning-window');
    },
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

        element.style.left = element.offsetLeft - posx1 + 'px';
        element.style.top = element.offsetTop - posy1 + 'px';
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }

    dragElement(document.getElementById('container') as HTMLDivElement);
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

p {
  user-select: none;
}
p.warning-title {
  padding: 0.2em 2em;
  color: $yellow;
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  font-size: 18pt;
}
p.warning-message {
  background: $background-50;
  padding: 1em 2em;
  margin: 1em auto;
  font-size: 14pt;
  border-radius: 5px;
  color: $white;
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

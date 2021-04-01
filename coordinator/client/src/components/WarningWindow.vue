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
  background: $background;
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
  border: 0.3em solid $warning-border;
  box-shadow: 3px 3px 3px 0.1px $warning-shadow,
    inset 0 0 0 0.2em $warning-inset;
  border-radius: 5px;
  background: $warning-background;
  background-image: radial-gradient($warning-shadow 1px, transparent 1px),
    radial-gradient($warning-shadow 1px, $warning-background 1px);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
}

p {
  user-select: none;
}
p.warning-title {
  background: repeating-linear-gradient(
    135deg,
    $warning-background,
    $warning-background 10px,
    $warning-border 10px,
    $warning-border 20px
  );
  padding: 0.2em 2em;
  color: white;
  font-family: "Rubik", sans-serif;
  font-size: 18pt;
}
p.warning-message {
  background: $warning-message-background;
  padding: 1em 2em;
  border: 0.2em solid $warning-border;
  margin: 1em auto;
  font-size: 14pt;
  border-radius: 5px;
  box-shadow: inset 0 0 0 0.2em $warning-inset,
    inset 0 0 0 0.3em $warning-border;
}

button.exit-button {
  position: absolute;
  right: 5%;
  top: -4%;
  margin: 0;
  padding: 0.2em 0.4em;

  outline: none;
  border: 0.2em solid $close-button-border;
  box-shadow: inset 0 0 0 0.1em $close-button-inset;
  background: $close-button-background;
  border-radius: 5px;

  i {
    color: white;
  }
}
button.exit-button:active {
  background: $close-button-active;
}
button.option {
  outline: none;
  border: 0.2em solid $warning-border;
  background: $warning-message-background;
  border-radius: 5px;
  padding: 0.4em 2em;
  font-size: 12pt;
  font-weight: 700;
  font-family: "Rubik", sans-serif;
  margin: 0em 0.3em 1em 0.3em;
  box-shadow: inset 0 0 0 0.2em $warning-message-background,
    inset 0 0 0 0.3em $warning-border;

  &.yes {
    box-shadow: inset 0 0 0 0.2em $warning-message-background,
      inset 0 0 0 0.3em green;
  }
  &.no {
    box-shadow: inset 0 0 0 0.2em $warning-message-background,
      inset 0 0 0 0.3em $close-button-border;
  }
}
button.option:active {
  background: $warning-message-active;
}
</style>

<template>
  <div class="container" id="container">
    <button class="exit-button">
      <i class="fas fa-times" />
    </button>
    <p class="warning-title">Warning Window</p>
    <p class="warning-message">You'll have to be careful with that buddy...</p>
    <div class="button-container">
      <button class="option yes">OK</button>
      <button class="option no">NO</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    show: Boolean,
  },
  mounted() {
    function dragElement(element: HTMLDivElement) {
      var posx1: number, posy1: number, posx2: number, posy2: number;

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
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
@import "./colors.scss";

div.container {
  display: inline-block;
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0em 0.5em;
  margin: auto auto;
  width: 20em;
  border: 0.3em solid $warning-border;
  box-shadow: 3px 3px 3px 0.1px $warning-shadow,
    inset 0 0 0 0.2em $warning-inset;
  border-radius: 5px;
  background: $warning-background;
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
}
p.warning-message {
  background: $warning-message-background;
  padding: 1em 1.5em;
  border: 0.2em solid $warning-border;
  margin: 1em auto;
  font-size: 10pt;
  border-radius: 5px;
  box-shadow: inset 0 0 0 0.2em $warning-inset,
    inset 0 0 0 0.3em $warning-border;
}

button.exit-button {
  position: absolute;
  right: 5%;
  top: -7%;

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

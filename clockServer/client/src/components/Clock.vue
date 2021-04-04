<template>
  <div class="clock">
    <div class="outer-clock-face">
      <div class="marking marking-one"></div>
      <div class="marking marking-two"></div>
      <div class="marking marking-three"></div>
      <div class="marking marking-four"></div>
      <div class="inner-clock-face">
        <div class="hand hour-hand" ref="hourHand"></div>
        <div class="hand minute-hand" ref="minuteHand"></div>
        <div class="hand second-hand" ref="secondHand"></div>
      </div>
    </div>
  </div>
  <p class="serverHour">Current server hour</p>
  <p>
    {{serverHour.toLocaleTimeString()}}
  </p>
</template>

<script lang="ts">
import { onMounted, Ref, ref } from "vue";

export default {
  props: {
    date: Date,
  },
  watch: {
    date: function (newDate: Date, _oldDate: Date) {
      this.serverHour = newDate;
      this.setDate();
    },
  },
  setup(props: any): any {
    const serverHour = ref<Date>(props.date);

    const hourHand: Ref<HTMLDivElement | null> = ref(null);
    const minuteHand: Ref<HTMLDivElement | null> = ref(null);
    const secondHand: Ref<HTMLDivElement | null> = ref(null);

    function setDate() {
      const seconds = serverHour.value.getSeconds();
      const minutes = serverHour.value.getMinutes();
      const hours = serverHour.value.getHours();
      const secondsDegrees = seconds * 6 + 90;
      const minutesDegrees = minutes * 6 + seconds / 10 + 90;
      const hoursDegrees = hours * 30 + minutes / 2 + 90;

      if (secondHand.value && minuteHand.value && hourHand.value) {
        secondHand.value.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHand.value.style.transform = `rotate(${minutesDegrees}deg)`;
        hourHand.value.style.transform = `rotate(${hoursDegrees}deg)`;
      }
    }

    return {
      hourHand,
      minuteHand,
      secondHand,
      serverHour,
      setDate
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./colors.scss";

p.serverHour {
  margin: 0.5em 0 0 0;
  font-size: 12pt;
  color: $yellow;
}
p {
  margin: 0 0 1em 0;
  color: $white;
  font-size: 14pt;
  font-family: "Rubik", sans-serif;
}

.clock {
  position: relative;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin: auto;
  padding: 0.7rem;
  background: $foreground;

  .outer-clock-face {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: $white;
    overflow: hidden;

    .inner-clock-face {
      position: absolute;
      top: 10%;
      left: 10%;
      width: 80%;
      height: 80%;
      background: $white;
      border-radius: 50%;
      z-index: 1;

      .hand {
        position: absolute;
        width: 50%;
        height: 6px;
        top: 48%;
        right: 50%;
        background: $foreground;
        border-radius: 6px;
        transform-origin: 100%;
        transform: rotate(90deg);
      }
      .hand.hour-hand {
        width: 30%;
        z-index: 3;
      }
      .hand.minute-hand {
        width: 38%;
        height: 4px;
        z-index: 5;
      }
      .hand.second-hand {
        background: $red;
        width: 45%;
        height: 2px;
        z-index: 8;
      }
    }
    .inner-clock-face::before {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      border-radius: 18px;
      background: $background;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
  }
  .outer-clock-face::after {
    transform: rotate(90deg);
  }
  .outer-clock-face::before,
  .outer-clock-face::after,
  .outer-clock-face .marking {
    position: absolute;
    content: "";
    width: 6px;
    height: 100%;
    background: $background-50;
    z-index: 0;
    left: 48%;
  }

  .outer-clock-face .marking {
    background: $background-25;
    width: 3px;
    transition: all 0.1s;
  }

  .outer-clock-face .marking.marking-one {
    transform: rotate(30deg);
  }

  .outer-clock-face .marking.marking-two {
    transform: rotate(60deg);
  }

  .outer-clock-face .marking.marking-three {
    transform: rotate(120deg);
  }

  .outer-clock-face .marking.marking-four {
    transform: rotate(150deg);
  }
}
</style>

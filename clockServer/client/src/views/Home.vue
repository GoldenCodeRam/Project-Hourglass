<template>
  <div class="home">
    <warning-window
      v-if="showWarningWindow"
      @hide-warning-window="showWarningWindow = false"
    />
    <clock />
    <button @click="showWarningWindow = true">Show element</button>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import WarningWindow from "@/components/WarningWindow.vue";
import Clock from "@/components/Clock.vue";
import { ref } from "vue";

const showWarningWindow = ref<boolean>(true);

export default {
  setup() {
    return {
      showWarningWindow,
    };
  },
  components: {
    HelloWorld,
    WarningWindow,
    Clock,
  },
};
</script>

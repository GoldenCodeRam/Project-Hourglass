<template>
  <div class="home">
    <warning-window v-model="warningWindow" :show="showWarningWindow" />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import WarningWindow from "@/components/WarningWindow.vue";
import { ref } from "vue";

const warningWindow: typeof WarningWindow = WarningWindow;
const showWarningWindow = ref<boolean>(true);

export default {
  setup() {
    console.log(warningWindow);
    return {
      warningWindow,
      showWarningWindow,
    };
  },
  components: {
    HelloWorld,
    // eslint-disable-next-line vue/no-unused-components
    WarningWindow,
  },
};
</script>

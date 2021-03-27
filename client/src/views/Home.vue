<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import WarningWindow from "@/components/WarningWindow.vue";
import WarningWindowVue from '@/components/WarningWindow.vue';

export default {
  components: {
    HelloWorld,
    // eslint-disable-next-line vue/no-unused-components
    WarningWindow,
  },
};
</script>

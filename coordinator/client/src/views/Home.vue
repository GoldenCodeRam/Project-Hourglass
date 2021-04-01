<template>
  <div class="home">
    <warning-window
      v-if="showWarningWindow"
      @hide-warning-window="showWarningWindow = false"
    />
    <server-status-card />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import WarningWindow from "@/components/WarningWindow.vue";
import ServerStatusCard from "@/components/ServerStatusCard.vue";

export default {
  setup() {
    const showWarningWindow = ref<boolean>(true);
    return {
      showWarningWindow,
    };
  },
  components: {
    WarningWindow,
    ServerStatusCard,
  },
};
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

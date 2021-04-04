<template>
  <div class="home">
    <p class="title">Project Hourglass</p>
    <p class="subtitle">Coordinator</p>
    <warning-window
      v-if="showWarningWindow"
      @hide-warning-window="showWarningWindow = false"
    />

    <div class="cardContainer">
      <server-status-card
        v-for="(information, index) in serverStatusList"
        :key="index"
        :serverName="information.serverName"
        :clientPort="information.clientPort"
        :isServerUp="information.isServerUp"
      />
    </div>
    <button class="option" @click="createServerInstance">Create new server instance 🐣</button>
    <button class="option" @click="synchronizeServerClocks">Get all servers current dates ⏱</button>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import WarningWindow from "@/components/WarningWindow.vue";
import ServerStatusCard from "@/components/ServerStatusCard.vue";
import socket from "@/model/socket";

import { ServerStatus } from "@/model/interfaces/ServerStatus";

export default {
  setup() {
    const showWarningWindow = ref<boolean>(false);
    const serverStatusList = ref<Array<ServerStatus>>([]);

    socket.connect().on("serverStatusList", (list) => {
      serverStatusList.value = [];
      list.forEach((serverStatus: any) => {
        serverStatusList.value.push({
          serverName: serverStatus.serverName,
          clientPort: serverStatus.clientPort,
          isServerUp: serverStatus.serverResponseCode == 200,
        });
      });
    });

    function createServerInstance() {
      if (socket.connected) {
        socket.emit("createServerInstance");
      }
    }

    function synchronizeServerClocks() {
      if (socket.connected) {
        socket.emit("synchronizeServerClocks");
      }
    }

    return {
      showWarningWindow,
      serverStatusList,
      createServerInstance,
      synchronizeServerClocks,
    };
  },
  components: {
    WarningWindow,
    ServerStatusCard,
  },
};
</script>

<style lang="scss" scoped>
@import "../components/colors.scss";

.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

p.title {
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  font-size: 28pt;
  color: $white;
  margin: 0;
  padding: 1em 1em 0em 1em;
}
p.subtitle {
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  font-size: 14pt;
  color: $blue;
  margin: 0;
  padding: 0 0 2em 0;
}

div.cardContainer {
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>

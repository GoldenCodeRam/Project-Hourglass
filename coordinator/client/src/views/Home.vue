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
        :isServerUp="information.isServerUp"
      />
    </div>
    <button @click="createNewServerInstance">Create new server instance</button>
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
      list.forEach((serverStatus: any) => {
        serverStatusList.value.push({
          serverName: serverStatus.serverName,
          isServerUp: serverStatus.serverResponseCode == 200,
        });
      });
    });

    function createNewServerInstance() {
      if (socket.connected) {
        socket.emit("createServerInstance");
      }
    }

    return {
      showWarningWindow,
      serverStatusList,
      createNewServerInstance,
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
  color: $yellow;
  margin: 0;
  padding: 0em 1em 1em 1em;
}

div.cardContainer {
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>

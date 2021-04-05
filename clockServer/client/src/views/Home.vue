<template>
  <div class="home">
    <warning-window
      v-if="showWarningWindow"
      @hide-window="showWarningWindow = false"
    />
    <change-hour-window
      v-if="showChangeHourWindow"
      @hide-window="showChangeHourWindow = false"
      @set-server-hour="changeServerHour"
    />

    <p class="title">Project Hourglass</p>
    <p class="subtitle">Clock Server</p>
    <clock
      :date="serverHour"
    />
    <button class="option" @click="showChangeHourWindow = true">Change server hour</button>
    <log-table
      v-model:dateLogs="serverHourLogs"
    />
  </div>
</template>

<script lang="ts">
import ChangeHourWindow from "@/components/ChangeHourWindow.vue";
import Clock from "@/components/Clock.vue";
import LogTable from "@/components/LogTable.vue";
import WarningWindow from "@/components/WarningWindow.vue";

import { ref } from "vue";

import socket from "@/model/socket";

const showWarningWindow = ref<boolean>(false);
const showChangeHourWindow = ref<boolean>(false);

const serverHour = ref<Date>();
const serverHourLogs = ref<Array<any>>([]);

export default {
  setup() {
    socket.connect();
    socket.on("newServerDate", (date: string) => {
      serverHour.value = new Date(date);
      serverHourLogs.value.unshift({
        hour: serverHour.value,
        comment: "Time at connection with server ⏱.",
      });
    });
    socket.on("serverDate", (date: string) => {
      serverHour.value = new Date(date);
    });
    socket.on("serverHourChanged", (offset: number) => {
      console.log(offset);
      serverHourLogs.value.unshift({
        hour: serverHour.value,
        comment: `Server date updated with offset ${offset}`,
      });
    });

    function changeServerHour(hours: number, minutes: number, seconds: number): any {
      serverHour.value = new Date(new Date().setHours(hours, minutes, seconds));
      socket.emit("changeServerHour", serverHour.value);
      serverHourLogs.value.unshift({
        hour: serverHour.value,
        comment: "Client changed the date.",
      });
      showChangeHourWindow.value = false;
    }

    return {
      showWarningWindow,
      showChangeHourWindow,
      changeServerHour,
      serverHour,
      serverHourLogs,
    };
  },
  components: {
    Clock,
    LogTable,
    WarningWindow,
    ChangeHourWindow,
  },
};
</script>

<style lang="scss" scoped>
@import "../components/colors.scss";

.home {
  width: 100%;
  height: 100%;
  overflow: auto;
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
  color: $cyan;
  margin: 0;
  padding: 0 0 2em 0;
}
</style>

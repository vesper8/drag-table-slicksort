<template>
  <div id="app" style="margin: 24px">
    <div>
      <p style="margin-bottom: 24px">
        Current ant-design-vue version: {{ version }}
        <br>You can change ant-design-vue version on the left panel (Dependencies
        section).
      </p>
    </div>
    <a-divider/>
    <!-- code -->
    <DragTable/>
  </div>
</template>

<script>
import moment from "moment";
import { version } from "ant-design-vue";

import DragTable from "@/components/DraggableTable";

export default {
  name: "App",
  components: {
    DragTable
  },
  data() {
    return {
      moment,
      version,
      console: console
    };
  },
  methods: {}
};
</script>

<style></style>

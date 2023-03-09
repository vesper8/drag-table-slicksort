<template>
  <a-table
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    :columns="columns"
    :loading="loading"
    :data-source="tableData"
    :pagination="false"
    :components="components"
    size="middle"
    :rowKey="row => row.key"
    class="drag-table"
  >
    <template slot="control" slot-scope="text, record, index">
      <a-icon type="menu" :style="{ cursor: 'pointer' }" v-handle/>
    </template>
    <template slot="task" slot-scope="text, record, index">
      <a-tooltip placement="topLeft">
        <template slot="title">{{ text }}</template>
        <span>{{ text }}</span>
      </a-tooltip>
    </template>
  </a-table>
</template>
<script>
import CustomWrapper from "./CustomWrapper.jsx";
import CustomRow from "./CustomRow.jsx";
import { HandleDirective } from "vue-slicksort";
import moment from "moment";

const columns = [
  {
    title: "",
    width: "45px",
    align: "left",
    className: "control",
    scopedSlots: { customRender: "control" }
  },
  {
    title: "Task",
    dataIndex: "task",
    className: "task",
    ellipsis: true,
    scopedSlots: { customRender: "task" }
  },
  {
    title: "Date",
    className: "date",
    width: "100px",
    dataIndex: "date"
  }
];

let tableData = [];
for (let index = 0; index < 10; index++) {
  const ranNum = parseInt(Math.random() * 30, 10);
  tableData.push({
    key: index,
    task: `${index} - Lorem ipsum dolor sitre deserror, nisi possimus temporibus molestiae.`,
    date: moment()
      .subtract(ranNum, "days")
      .format("L")
  });
}

export default {
  name: "DraggableTable",
  provide() {
    return {
      data: this
    };
  },
  directives: { handle: HandleDirective },
  data() {
    return {
      columns,
      selectedRowKeys: [0, 2, 4, 5, 7],
      loading: true,
      tableData: [],
      components: {
        body: {
          wrapper: CustomWrapper,
          row: CustomRow
        }
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.tableData = tableData;
      this.loading = false;
    }, 1000);
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    }
  }
};
</script>


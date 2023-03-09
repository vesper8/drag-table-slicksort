import item from "./Item.jsx";

export default {
  inject: ["data"],
  components: {
    item
  },
  render() {
    const {
      data: { tableData },
      $slots,
      $parent
    } = this;
    const index = tableData.findIndex((x) => x.key === $parent.rowKey);
    return <item index={index}>{$slots.default}</item>;
  }
};

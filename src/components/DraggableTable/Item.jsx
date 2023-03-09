import { ElementMixin } from "vue-slicksort";

export default {
  name: "DraggableItem",
  mixins: [ElementMixin],
  render() {
    return <tr>{this.$slots.default}</tr>;
  }
};

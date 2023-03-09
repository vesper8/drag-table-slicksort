import { ContainerMixin } from "vue-slicksort";

export default {
  name: "DraggableContainer",
  mixins: [ContainerMixin],
  render() {
    return <tbody>{this.$slots.default}</tbody>;
  }
};

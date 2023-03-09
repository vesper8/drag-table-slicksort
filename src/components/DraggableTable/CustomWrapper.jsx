import arrayMove from "array-move";
import container from "./Container.jsx";

const helpClassName = `row-dragging`;

export default {
  inject: ["data"],
  data() {
    return {
      isHideDragTransition: true,
      isHideCheckedTransition: false,
      taskWidth: null
    };
  },
  components: {
    container
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    onSortStart() {
      this.isHideDragTransition = false;
      this.isHideCheckedTransition = true;
      const el = document.querySelector(`.${helpClassName} td.task`);
      if (el) {
        el.style.maxWidth = `${this.taskWidth}px`;
        el.style.width = `${this.taskWidth}px`;
      }
    },

    onSortEnd({ oldIndex, newIndex }) {
      if (oldIndex !== newIndex) {
        const newData = arrayMove(
          [...this.data.tableData],
          oldIndex,
          newIndex
        ).filter((el) => !!el);
        this.data.tableData = newData;
      }
      this.isHideDragTransition = true;
    },

    onInput() {
      setTimeout(() => {
        this.isHideCheckedTransition = false;
      }, 200);
    },

    getTaskWidth() {
      const el = this.$parent.$el.querySelector(`th[key="task"]`);
      if (!el) return null;
      return el.offsetWidth;
    },

    handleResize() {
      const w = this.getTaskWidth();
      if (w) {
        this.taskWidth = w;
      }
    }
  },
  render() {
    const {
      data: { tableData },
      $slots
    } = this;

    return (
      <container
        {...{
          on: {
            ["sort-start"]: this.onSortStart,
            ["sort-end"]: this.onSortEnd,
            input: this.onInput
          }
        }}
        helperClass={helpClassName}
        lockAxis="y"
        lockOffset="50%"
        transitionDuration={250}
        draggedSettlingDuration={150}
        pressDelay={0}
        pressThreshold={5}
        distance={0}
        useWindowAsScrollContainer={false}
        useDragHandle={true}
        hideSortableGhost={true}
        lockToContainerEdges={true}
        value={tableData}
        class={{
          "hide-drag-transition": this.isHideDragTransition,
          "hide-checkbox-transiton": this.isHideCheckedTransition
        }}
      >
        {$slots.default}
      </container>
    );
  }
};

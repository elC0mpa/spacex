<template>
  <span class="status-component" :class="{ 'is-active': active }">
    {{ active ? activeText : inactiveText }}
  </span>
</template>

<script>
export default {
  name: "StatusComponent",
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    activeText: {
      type: String,
      default: "active",
    },
    inactiveText: {
      type: String,
      default: "inactive",
    },
  },
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss" scoped>
.status-component {
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  background-color: transparentize($color: red, $amount: 0.85);
  border: 2px solid red;
  &.is-active {
    background-color: transparentize($color: green, $amount: 0.85);
    border: 2px solid green;
  }
}
</style>

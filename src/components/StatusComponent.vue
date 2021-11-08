<template>
  <span class="status-component" :class="{ 'is-active': active }">
    {{ active ? "active" : "inactive" }}
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
  },
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss" scoped>
.status-component {
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  font-weight: bold;
  border: 2px solid white;
  background-color: transparentize($color: red, $amount: 0.85);
  color: red;
  &.is-active {
    background-color: transparentize($color: green, $amount: 0.85);
    color: green;
  }
}
</style>

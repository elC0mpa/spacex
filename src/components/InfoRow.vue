<template>
  <div class="info-row__container">
    <p class="info-row__property">{{ label }}:</p>
    <p class="info-row__value">
      {{ value }}
    </p>
  </div>
</template>

<script>
export default {
  name: "InfoRow",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss">
.info-row {
  &__container {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid lightgray;
    margin-top: 7px;
  }
  &__property {
    font-size: 2rem;
    line-height: 3.5rem;
    font-weight: bold;
  }
  &__value {
    font-size: 2rem;
    line-height: 3.5rem;
  }
}
</style>

<template>
  <div class="time-left">
    <div class="time-left__unit-container">
      <div class="time-left__unit-container--unit">{{ days }}</div>
      <div class="time-left__unit-container--text">days</div>
    </div>
    <div class="time-left__unit-container">
      <div class="time-left__unit-container--unit">{{ hours }}</div>
      <div class="time-left__unit-container--text">hours</div>
    </div>
    <div class="time-left__unit-container">
      <div class="time-left__unit-container--unit">{{ minutes }}</div>
      <div class="time-left__unit-container--text">minutes</div>
    </div>
    <div class="time-left__unit-container">
      <div class="time-left__unit-container--unit">{{ seconds }}</div>
      <div class="time-left__unit-container--text">seconds</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeLeft",
  props: {
    days: {
      required: true,
      type: Number,
    },
    hours: {
      required: true,
      type: Number,
    },
    minutes: {
      required: true,
      type: Number,
    },
    seconds: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss" scoped>
.time-left {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  &__unit-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    &--unit {
      font-size: 5rem;
    }
    &--text {
      font-size: 3rem;
      @include responsive(medium-bp) {
        font-size: 2.5rem;
      }
      @include responsive(small-bp) {
        font-size: 2rem;
      }
    }
  }
}
</style>

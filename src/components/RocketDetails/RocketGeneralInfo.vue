<template>
  <div class="rocket-general-info">
    <div class="rocket-general-info__name-status-container">
      <p class="rocket-general-info__name">{{ rocket?.name }}</p>
      <status-component :active="rocket?.active"></status-component>
    </div>
    <div class="rocket-general-info__gral-specs">
      <div class="rocket-general-info__gral-specs--container">
        <p class="rocket-general-info__gral-specs--property">First Flight:</p>
        <p class="rocket-general-info__gral-specs--value">
          {{ rocket?.first_flight }}
        </p>
      </div>
      <div class="rocket-general-info__gral-specs--container">
        <p class="rocket-general-info__gral-specs--property">
          Cost Per Launch:
        </p>
        <p class="rocket-general-info__gral-specs--value">
          {{ rocket?.cost_per_launch / 1000000 }}M
        </p>
      </div>
      <div class="rocket-general-info__gral-specs--container">
        <p class="rocket-general-info__gral-specs--property">Success Rate:</p>
        <p class="rocket-general-info__gral-specs--value">
          {{ rocket?.success_rate_pct }}%
        </p>
      </div>
    </div>
    <br />
    <p class="rocket-general-info__description">{{ rocket?.description }}</p>
  </div>
</template>

<script>
import StatusComponent from "@/components/StatusComponent";
export default {
  name: "RocketGeneralInfo",
  props: {
    rocket: {
      required: true,
    },
  },
  components: {
    StatusComponent,
  },
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss" scoped>
.rocket-general-info {
  &__name-status-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__name {
    @include main-text;
  }
  &__gral-specs {
    display: flex;
    flex-direction: column;
    &--container {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid black;
    }
    &--property {
      font-size: 2rem;
      line-height: 3.5rem;
    }
    &--value {
      font-weight: bold;
      font-size: 2rem;
      line-height: 3.5rem;
    }
  }
  &__description {
    margin-top: 1rem;
    font-size: 2.3rem;
    line-height: 3.5rem;
    text-align: justify;
  }
}
</style>

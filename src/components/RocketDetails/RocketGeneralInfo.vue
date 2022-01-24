<template>
  <div class="rocket-general-info">
    <div class="rocket-general-info__name-status-container">
      <p class="rocket-general-info__name">{{ rocket?.name }}</p>
      <status-component :active="rocket?.active"></status-component>
    </div>
    <info-row label="First Flight" :value="rocket?.first_flight" />
    <info-row
      label="Cost Per Launch"
      :value="`${rocket?.cost_per_launch / 1000000} M`"
    />
    <info-row label="Success Rate" :value="`${rocket?.success_rate_pct} %`" />
    <br />
    <p class="rocket-general-info__description">{{ rocket?.description }}</p>
  </div>
</template>

<script>
import StatusComponent from "@/components/StatusComponent";
import InfoRow from "@/components/InfoRow.vue";
export default {
  name: "RocketGeneralInfo",
  props: {
    rocket: {
      required: true,
    },
  },
  components: {
    StatusComponent,
    InfoRow,
  },
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss" scoped>
.rocket-general-info {
  @include info-card;
  align-self: flex-start;
  &__name-status-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__name {
    @include main-text;
  }
  &__description {
    margin-top: 1rem;
    font-size: 2.3rem;
    line-height: 3.5rem;
    text-align: justify;
  }
  @include responsive(medium-bp) {
    margin-bottom: 2rem;
  }
}
</style>

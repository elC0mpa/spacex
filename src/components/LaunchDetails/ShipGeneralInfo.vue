<template>
  <div class="ship-general-info">
    <div class="ship-general-info__name-status-container">
      <p class="ship-general-info__name">{{ ship?.name }}</p>
      <status-component :active="ship?.active"></status-component>
    </div>
    <info-row label="Type" :value="ship?.type" />
    <info-row label="Launches" :value="ship?.launches.length" />
  </div>
</template>

<script>
import InfoRow from "../InfoRow.vue";
import StatusComponent from "../StatusComponent.vue";
export default {
  components: { StatusComponent, InfoRow },
  name: "ShipGeneralInfo",
  props: {
    ship: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss">
.ship-general-info {
  @include info-card;
  background: #00000040;
  align-self: flex-start;
  @include responsive(medium-bp) {
    margin-top: 1rem;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  @include responsive(small-bp) {
    margin-top: 1rem;
    width: 100%;
  }
  &__name-status-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include responsive(smallest-bp) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__name {
    @include main-text;
  }
}
</style>





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
  align-self: flex-start;
  &__name-status-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__name {
    @include main-text;
  }
}
</style>





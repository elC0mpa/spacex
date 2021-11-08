<template>
  <div class="rocket-card">
    <img :src="rocket.flickr_images[1]" />
    <div class="rocket-card__info">
      <div class="rocket-card__name-status-container">
        <span class="rocket-card__name">{{ rocket.name }}</span>
        <status-component :active="rocket.active"></status-component>
      </div>
      <div class="rocket-card__description-specs">
        <p class="rocket-card__description">{{ rocket.description }}</p>
        <div class="rocket-card__specs">
          <div>
            First Flight:
            <span class="rocket-card__specs-value">
              {{ rocket.first_flight }}
            </span>
          </div>
          <div>
            Cost Per Launch:
            <span class="rocket-card__specs-value">
              ${{ rocket.cost_per_launch / 1000000 }}M
            </span>
          </div>
          <div>
            Success Rate:
            <span class="rocket-card__specs-value">
              {{ rocket.success_rate_pct }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatusComponent from "./StatusComponent.vue";
export default {
  components: { StatusComponent },
  name: "RocketCard",
  props: {
    rocket: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return { props };
  },
};
</script>

<style lang="scss" scoped>
.rocket-card {
  color: black;
  margin-top: 1.5rem;
  background-color: #ffffff10;
  backdrop-filter: blur(12px);
  padding: 3rem;
  border-radius: 2rem;
  height: 30rem;
  display: flex;
  font-size: 1.8rem;
  &__info {
    margin-left: 1.5rem;
  }
  &__name-status-container {
    display: flex;
    align-items: center;
  }
  &__name {
    font-size: 5rem;
    color: $star-command-blue;
    font-weight: bold;
    margin-right: 2rem;
  }
  &__description-specs {
    display: flex;
  }
  &__description {
    flex: 0 0 60%;
    text-align: justify;
    margin-right: 1.5rem;
  }
  &__specs-value {
    font-weight: bold;
  }
}
</style>

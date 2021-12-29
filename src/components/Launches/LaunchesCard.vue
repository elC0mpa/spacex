<template>
  <div class="launch-card">
    <status-component :active="rocket.active"></status-component>
    <img class="rocket-card__image" :src="rocket.flickr_images[1]" />
    <span class="rocket-card__name">{{ rocket.name }}</span>
  </div>
</template>

<script>
import StatusComponent from "../StatusComponent.vue";
export default {
  components: { StatusComponent },
  name: "LaunchesCard",
  props: {
    launch: {
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
.rocket-card {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: #ffffff10;
  backdrop-filter: blur(20px);
  padding: 3rem;
  border-radius: 2rem;
  height: 30rem;
  transition: all 0.5s;
  cursor: pointer;
  opacity: 0.95;
  transform-origin: center top;
  transform-style: preserve-3d;
  .status-component {
    position: absolute;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.5s;
  }
  &__image {
    width: 80%;
    min-height: 100%;
  }
  &__name {
    @include main-text;
    position: absolute;
    transform: translateY(100%);
    opacity: 0;
    bottom: 25px;
    transition: all 0.5s;
  }
  &:hover {
    opacity: 1;
    transform: translateX(-3px) scale(1.05) rotateY(15deg);
    box-shadow: 0 8px 16px 3px rgba(#000, 0.6);
    .rocket-card__name {
      transform: translateY(0px);
      opacity: 1;
    }
    .status-component {
      transform: translateY(10px);
      opacity: 1;
    }
  }
}
</style>

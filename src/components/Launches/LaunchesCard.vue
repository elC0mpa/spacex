<template>
  <div
    class="launch-card"
    v-observe-visibility="isLastItem ? visibilityChanged : false"
  >
    <div class="launch-card__container">
      <div class="launch-card__title-status-container">
        <p class="launch-card__name">{{ launch?.name }}</p>
        <status-component
          activeText="success"
          inactiveText="failure"
          :active="launch?.success"
        ></status-component>
      </div>
      <p class="launch-card__date">
        {{ dayjs(launch?.date_utc).format("LLL") }}
        ({{ dayjs(launch?.date_utc).toNow(true) }} ago)
      </p>
      <p class="launch-card__details">{{ launch?.details }}</p>
    </div>
    <img class="launch-card__image" :src="launch?.links?.patch?.small" />
  </div>
</template>

<script>
import StatusComponent from "../StatusComponent.vue";
import dayjs from "dayjs";
import { computed } from "vue";
export default {
  components: { StatusComponent },
  name: "LaunchesCard",
  props: {
    launch: {
      type: Object,
      required: true,
    },
    lastLaunch: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const localizedFormat = require("dayjs/plugin/localizedFormat");
    var relativeTime = require("dayjs/plugin/relativeTime");
    dayjs.extend(localizedFormat);
    dayjs.extend(relativeTime);
    const isLastItem = computed(
      () => props?.launch?.id === props?.lastLaunch?.id
    );
    const visibilityChanged = (visible) => {
      visible && context.emit("last-item-visible");
    };
    return { props, dayjs, isLastItem, visibilityChanged };
  },
};
</script>

<style lang="scss">
.launch-card {
  display: flex;
  justify-content: space-between;
  color: white;
  min-height: 19rem;
  background-color: #ffffff10;
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 2rem;
  cursor: pointer;
  opacity: 0.85;
  transition: all 0.5s;
  backdrop-filter: blur(20px);
  &:hover {
    opacity: 1;
  }
  &__container {
    position: relative;
    margin-right: 36px;
    width: 80%;
  }
  &__title-status-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__name {
    @include main-text;
  }
  &__details {
    font-size: 2rem;
  }
  &__date {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  &__image {
    width: 150px;
    align-self: center;
  }
}
</style>


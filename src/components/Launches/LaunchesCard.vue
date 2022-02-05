<template>
  <div
    class="launch-card"
    :class="{
      'show-details': showDetails,
    }"
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
        📆
        {{ dayjs(launch?.date_utc).format("LLL") }}
        ({{ dayjs(launch?.date_utc).toNow(true) }} ago)
      </p>
      <p
        v-if="showDetails"
        class="launch-card__launchpad"
        @click="clickedLaunchpad"
      >
        📍 {{ launch?.launchpad.full_name }}
      </p>
      <router-link
        v-if="showDetails"
        class="launch-card__rocket"
        :to="`/rockets/${launch?.rocket.id}`"
        >🚀 {{ launch?.rocket.name }}</router-link
      >
      <p
        class="launch-card__details"
        :class="{
          'full-details': showDetails,
        }"
      >
        {{ launch?.details }}
      </p>
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
    showDetails: {
      type: Boolean,
      default: false,
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
    const clickedLaunchpad = () => {
      window.dispatchEvent(new Event("resize"));
      context.emit("show-launchpad-location");
    };
    return { props, dayjs, isLastItem, visibilityChanged, clickedLaunchpad };
  },
};
</script>

<style lang="scss">
.launch-card {
  display: flex;
  justify-content: space-between;
  color: white;
  min-height: 19rem;
  background-color: #00000040;
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 2rem;
  cursor: pointer;
  opacity: 0.85;
  transition: all 0.5s;
  backdrop-filter: blur(20px);
  &.show-details {
    cursor: default;
    opacity: 1;
  }
  @include responsive(small-bp) {
    outline: 2px solid $star-command-blue;
  }
  &:hover {
    opacity: 1;
    outline: 2px solid $star-command-blue;
  }
  &__container {
    position: relative;
    margin-right: 36px;
    width: 80%;
    @include responsive(smallest-bp) {
      width: 100%;
      margin-right: 0;
    }
  }
  &__title-status-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include responsive(small-bp) {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
  }
  &__name {
    @include main-text;
  }
  &__details {
    font-size: 2rem;
    overflow: hidden;
    margin-top: 2rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    &.full-details {
      text-overflow: initial;
      display: block;
    }
  }
  &__date,
  &__launchpad,
  &__rocket {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  &__rocket {
    @include rocket-cursor;
    &:link,
    &:visited {
      color: white;
      text-decoration: solid underline $star-command-blue;
    }
  }
  &__launchpad {
    cursor: pointer;
    text-decoration: solid underline $star-command-blue;
  }
  &__image {
    width: 150px;
    align-self: center;
    @include responsive(small-bp) {
      width: 100px;
    }
    @include responsive(smallest-bp) {
      display: none;
    }
  }
}
</style>


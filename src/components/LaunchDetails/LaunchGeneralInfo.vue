<template>
  <div class="launch-general-info">
    <div class="launch-general-info__container">
      <div class="launch-general-info__title-status-container">
        <p class="launch-general-info__name">{{ launch?.name }}</p>
        <status-component
          activeText="success"
          inactiveText="failure"
          :active="launch?.success"
        ></status-component>
      </div>
      <p class="launch-general-info__date">
        📆
        {{ dayjs(launch?.date_utc).format("LLL") }}
        ({{ dayjs(launch?.date_utc).toNow(true) }} ago)
      </p>
      <p
        class="launch-general-info__launchpad"
        @click="showLaunchpadDetails = true"
      >
        🎯 {{ launch?.launchpad.full_name }}
      </p>
      <router-link
        class="launch-general-info__rocket"
        :to="`/rockets/${launch?.rocket.id}`"
        >🚀 {{ launch?.rocket.name }}</router-link
      >
      <p class="launch-general-info__details">{{ launch?.details }}</p>
    </div>
    <img
      class="launch-general-info__image"
      :src="launch?.links?.patch?.small"
    />
    <vue-final-modal
      v-model="showLaunchpadDetails"
      :click-to-close="true"
      :esc-to-close="true"
    >
      <launch-pad-details :launchpad="launch?.launchpad" />
    </vue-final-modal>
  </div>
</template>

<script>
import StatusComponent from "../StatusComponent.vue";
import dayjs from "dayjs";
import { reactive, toRefs } from "vue";
import LaunchPadDetails from "./LaunchPadDetails.vue";

export default {
  components: { StatusComponent, LaunchPadDetails },
  name: "LaunchGeneralInfo",
  props: {
    launch: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const localizedFormat = require("dayjs/plugin/localizedFormat");
    var relativeTime = require("dayjs/plugin/relativeTime");
    dayjs.extend(localizedFormat);
    dayjs.extend(relativeTime);
    const state = reactive({
      showLaunchpadDetails: false,
    });
    return { props, dayjs, ...toRefs(state) };
  },
};
</script>

<style lang="scss">
.launch-general-info {
  @include info-card;
  display: flex;
  justify-content: space-between;
  min-height: 19rem;
  margin-bottom: 2rem;
  padding: 2rem;
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
    margin-top: 1rem;
    font-size: 2rem;
  }
  &__date,
  &__rocket,
  &__launchpad {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  &__rocket {
    @include rocket-cursor;
  }
  &__launchpad {
    @include launchpad-cursor;
  }
  &__image {
    width: 150px;
    align-self: center;
  }
}
</style>



<template>
  <div class="home">
    <div class="home__info-container" v-if="!isLoading">
      <p class="home__info-container--header">
        Next launch: <span>{{ name }}</span>
      </p>
      <vue-count-down
        :time="timeToLaunch"
        v-slot="{ days, hours, minutes, seconds }"
      >
        <time-left
          :days="days"
          :hours="hours"
          :minutes="minutes"
          :seconds="seconds"
        ></time-left>
      </vue-count-down>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TimeLeft from "@/components/TimeLeft";
import { nextLaunchInfo } from "@/composables/api";
import { reactive, toRefs } from "@vue/reactivity";
import VueCountDown from "@chenfengyuan/vue-countdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
export default {
  name: "Home",
  components: {
    VueCountDown,
    TimeLeft,
  },
  setup() {
    dayjs.extend(relativeTime);
    const state = reactive({
      name: "",
      timeToLaunch: 0,
      isLoading: true,
    });

    nextLaunchInfo()
      .then((data) => {
        state.name = data.name;
        state.timeToLaunch = dayjs(data.date_local).diff(dayjs());
        state.isLoading = false;
      })
      .catch((error) => {
        console.log("Next launch error: ", error);
      });

    return { ...toRefs(state) };
  },
};
</script>

<style lang="scss">
.home {
  background-image: url("../assets/images/background-home.jpeg");
  background-position: right top;
  width: 100vw;
  height: 100vh;
  color: $color-white;
  &__info-container {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    &--header {
      font-size: 5rem;
      span {
        color: $star-command-blue;
        font-weight: bold;
      }
    }
  }
}
</style>

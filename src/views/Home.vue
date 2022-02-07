<template>
  <div class="home">
    <div class="home__info-container" v-if="!isLoading">
      <p class="home__info-container--header">
        {{ latestLaunchId ? "Last launch:" : "Next launch:" }}
        <span
          :class="{
            'link-to-last': latestLaunchId,
          }"
          @click="goToLastLaunchDetails"
          >{{ name }}</span
        >
      </p>
      <vue-count-down
        v-if="!latestLaunchId"
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
import TimeLeft from "@/components/TimeLeft.vue";
import { nextLaunchInfo, getLatestLaunch } from "@/composables/api";
import { reactive, toRefs } from "@vue/reactivity";
import VueCountDown from "@chenfengyuan/vue-countdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "vue-router";
import { useMeta } from "vue-meta";
export default {
  name: "Home",
  components: {
    VueCountDown,
    TimeLeft,
  },
  setup() {
    dayjs.extend(relativeTime);
    const router = useRouter();
    const state = reactive({
      name: "",
      timeToLaunch: 0,
      isLoading: true,
      latestLaunchId: undefined,
    });

    nextLaunchInfo()
      .then((data) => {
        state.name = data.name;
        state.timeToLaunch = dayjs(data.date_local).diff(dayjs());
        if (state.timeToLaunch <= 60000) {
          getLatestLaunch().then((dataLatest) => {
            state.name = dataLatest.name;
            state.latestLaunchId = dataLatest.id;
          });
        }
        state.isLoading = false;
      })
      .catch((error) => {
        console.log("Next launch error: ", error);
      });

    const goToLastLaunchDetails = () => {
      state.latestLaunchId &&
        router.push({
          name: "LaunchDetails",
          params: {
            id: state.latestLaunchId,
          },
        });
    };
    useMeta({
      title: "Home",
      description:
        "SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.",
    });

    return { ...toRefs(state), goToLastLaunchDetails };
  },
};
</script>

<style lang="scss">
.home {
  color: white;
  &__info-container {
    background-color: #00000040;
    backdrop-filter: blur(12px);
    padding: 3rem;
    border-radius: 2rem;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    @include responsive(medium-bp) {
      width: 100%;
      max-width: 50rem;
      top: 15rem;
      outline: 2px solid $star-command-blue;
    }
    &--header {
      font-size: 5rem;
      @include responsive(medium-bp) {
        font-size: 4rem;
      }
      @include responsive(small-bp) {
        font-size: 3rem;
      }
      span {
        color: $star-command-blue;
        font-weight: bold;
        @include responsive(medium-bp) {
          display: block;
        }
        &.link-to-last {
          text-decoration: solid underline $star-command-blue;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

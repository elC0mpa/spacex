<template>
  <div class="launches">
    <launches-card
      v-for="(launch, index) in launches"
      :key="index"
      :launch="launch"
      :last-launch="launches[launches.length - 4]"
      @last-item-visible="pagination"
      @click="launchDetails(launch)"
    ></launches-card>
  </div>
</template>

<script>
import { latestLaunchesInfo } from "@/composables/api";
import { reactive, toRefs } from "vue";
import LaunchesCard from "@/components/Launches/LaunchesCard.vue";
import { useRouter } from "vue-router";
import { useMeta } from "vue-meta";
export default {
  name: "Launches",
  components: {
    LaunchesCard,
  },

  setup() {
    const state = reactive({
      launches: [],
      nextPage: 1,
      pageSize: 20,
    });

    const router = useRouter();

    const pagination = () => {
      if (state.nextPage) {
        latestLaunchesInfo(state.nextPage, state.pageSize)
          .then((data) => {
            state.nextPage = data.nextPage;
            state.launches = [...state.launches, ...data.docs];
          })
          .catch((error) => {
            console.log("Next launch error: ", error);
          });
      }
    };

    const launchDetails = (launch) => {
      router.push({
        path: `/launches/${launch.id}`,
      });
    };

    pagination();

    useMeta({
      title: "Launches",
      description: "All launches from SpaceX company.",
    });
    return { ...toRefs(state), pagination, launchDetails };
  },
};
</script>

<style lang="scss" scoped>
.launches {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  padding: 3px;
  &::-webkit-scrollbar {
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
}
</style>

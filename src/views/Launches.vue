<template>
  <div class="launches">
    <launches-card
      v-for="(launch, index) in launches"
      :key="index"
      :launch="launch"
    ></launches-card>
  </div>
</template>

<script>
import { latestLaunchesInfo } from "@/composables/api";
import { reactive, toRefs } from "vue";
import LaunchesCard from "@/components/Launches/LaunchesCard.vue";
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
    latestLaunchesInfo(state.nextPage, state.pageSize)
      .then((data) => {
        state.nextPage = data.nextPage;
        state.launches = data.docs;
      })
      .catch((error) => {
        console.log("Next launch error: ", error);
      });

    return { ...toRefs(state) };
  },
};
</script>

<style lang="scss" scoped>
.launches {
  overflow: scroll;
  height: 100%;
}
</style>

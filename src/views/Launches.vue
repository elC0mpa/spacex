<template>
  <div>Hello</div>
</template>

<script>
import { latestLaunchesInfo } from "@/composables/api";
import { reactive, toRefs } from "vue";
export default {
  name: "Launches",
  setup() {
    const state = reactive({
      launches: [],
      nextPage: 1,
      pageSize: 20,
    });
    latestLaunchesInfo(state.nextPage, state.pageSize)
      .then((data) => {
        state.nextPage = data.nextPage;
        state.launches = [...state.launches, data.docs];
      })
      .catch((error) => {
        console.log("Next launch error: ", error);
      });

    return { ...toRefs(state) };
  },
};
</script>

<style lang="scss" scoped>
.rockets {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 5rem;
}
</style>

<template>
  <div class="launch-details">
    <div class="launch-details__general-info">General info</div>
  </div>
</template>

<script>
import { launchDetails } from "@/composables/api";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "@vue/reactivity";

export default {
  name: "RocketDetails",
  components: {},
  setup() {
    const route = useRoute();
    const state = reactive({
      launch: undefined,
      isLoading: true,
    });
    launchDetails(route.params.id)
      .then((data) => {
        state.launch = data;
        state.isLoading = false;
        console.log(state.launch);
      })
      .catch((error) => {
        console.log("Launch error: ", error);
      });

    return { ...toRefs(state) };
  },
};
</script>

<style lang="scss">
.rocket-details {
  &__general-info {
    display: flex;
    justify-content: space-between;
    > * {
      flex: 0 0 45%;
    }
    margin-bottom: 2rem;
  }
}
</style>


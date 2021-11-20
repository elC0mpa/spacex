<template>
  <div class="rocket-details"></div>
</template>

<script>
import { rocketDetails } from "@/composables/api";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "@vue/reactivity";

export default {
  name: "RocketDetails",
  setup() {
    const route = useRoute();
    const state = reactive({
      rocket: undefined,
    });
    rocketDetails(route.params.id)
      .then((data) => {
        state.rocket = data;
        console.log(state.rocket);
      })
      .catch((error) => {
        console.log("Rocket error: ", error);
      });

    return { ...toRefs(state) };
  },
};
</script>

<style lang="scss" scoped></style>

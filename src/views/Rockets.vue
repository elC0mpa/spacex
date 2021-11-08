<template>
  <div class="rockets">
    <rocket-card
      v-for="(rocket, index) in rockets"
      :rocket="rocket"
      :key="index"
    ></rocket-card>
  </div>
</template>

<script>
import { rocketsInfo } from "@/composables/api";
import RocketCard from "@/components/RocketCard";
import { reactive, toRefs } from "@vue/reactivity";
export default {
  name: "Rockets",
  components: {
    RocketCard,
  },
  setup() {
    const state = reactive({
      rockets: [],
    });
    rocketsInfo()
      .then((data) => {
        state.rockets = [...data];
        console.log(state.rockets);
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
}
</style>

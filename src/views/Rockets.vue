<template>
  <div class="rockets">
    <rocket-card
      v-for="(rocket, index) in rockets"
      :rocket="rocket"
      :key="index"
      @click="rocketDetails(rocket)"
    ></rocket-card>
  </div>
</template>

<script>
import { rocketsInfo } from "@/composables/api";
import RocketCard from "@/components/Rockets/RocketCard";
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  name: "Rockets",
  components: {
    RocketCard,
  },
  setup() {
    const state = reactive({
      rockets: [],
    });
    const router = useRouter();
    rocketsInfo()
      .then((data) => {
        state.rockets = [...data];
        console.log(state.rockets);
      })
      .catch((error) => {
        console.log("Next launch error: ", error);
      });

    const rocketDetails = (rocket) => {
      router.push({
        path: `/rockets/${rocket.id}`,
      });
    };
    return { ...toRefs(state), rocketDetails };
  },
};
</script>

<style lang="scss" scoped>
.rockets {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 5rem;
  @include responsive(largest-bp) {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
  @include responsive(medium-bp) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
  @include responsive(small-bp) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>

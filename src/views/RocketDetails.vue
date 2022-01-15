<template>
  <div class="rocket-details">
    <div class="rocket-details__general-info">
      <images-collection
        :images="isLoading ? [] : rocket.flickr_images"
      ></images-collection>
      <rocket-general-info :rocket="rocket"></rocket-general-info>
    </div>
    <rocket-main-info :rocket="isLoading ? {} : rocket"></rocket-main-info>
  </div>
</template>

<script>
import { rocketDetails } from "@/composables/api";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "@vue/reactivity";
import ImagesCollection from "@/components/ImagesCollection.vue";
import RocketGeneralInfo from "@/components/RocketDetails/RocketGeneralInfo.vue";
import RocketMainInfo from "@/components/RocketDetails/RocketMainInfoDesktop.vue";

export default {
  name: "RocketDetails",
  components: {
    ImagesCollection,
    RocketGeneralInfo,
    RocketMainInfo,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      rocket: undefined,
      isLoading: true,
    });
    rocketDetails(route.params.id)
      .then((data) => {
        state.rocket = data;
        state.isLoading = false;
        console.log(state.rocket);
      })
      .catch((error) => {
        console.log("Rocket error: ", error);
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

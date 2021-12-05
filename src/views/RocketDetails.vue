<template>
  <div class="rocket-details">
    <div class="rocket-details__main-info">
      <rocket-images
        :images="isLoading ? [] : rocket.flickr_images"
      ></rocket-images>
      <rocket-general-info :rocket="rocket"></rocket-general-info>
    </div>
    <div class="rocket-details__specific-info"></div>
  </div>
</template>

<script>
import { rocketDetails } from "@/composables/api";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "@vue/reactivity";
import RocketImages from "@/components/RocketDetails/RocketImages";
import RocketGeneralInfo from "@/components/RocketDetails/RocketGeneralInfo";

export default {
  name: "RocketDetails",
  components: {
    RocketImages,
    RocketGeneralInfo,
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
  &__main-info {
    display: flex;
    justify-content: space-between;
    > * {
      flex: 0 0 48%;
    }
  }
}
</style>

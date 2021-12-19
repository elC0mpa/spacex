<template>
  <div class="rocket-details">
    <div class="rocket-details__main-info">
      <rocket-images
        :images="isLoading ? [] : rocket.flickr_images"
      ></rocket-images>
      <rocket-general-info :rocket="rocket"></rocket-general-info>
    </div>
    <rocket-main-info :rocket="isLoading ? {} : rocket"></rocket-main-info>
  </div>
</template>

<script>
import { rocketDetails } from "@/composables/api";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "@vue/reactivity";
import RocketImages from "@/components/RocketDetails/RocketImages.vue";
import RocketGeneralInfo from "@/components/RocketDetails/RocketGeneralInfo.vue";
import RocketMainInfo from "@/components/RocketDetails/RocketMainInfo.vue";

export default {
  name: "RocketDetails",
  components: {
    RocketImages,
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
  &__main-info {
    display: flex;
    justify-content: space-between;
    > * {
      flex: 0 0 48%;
    }
  }
}
</style>

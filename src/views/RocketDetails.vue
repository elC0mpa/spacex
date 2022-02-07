<template>
  <div class="rocket-details">
    <div class="rocket-details__general-info">
      <images-collection
        :images="isLoading ? [] : rocket.flickr_images"
      ></images-collection>
      <rocket-general-info :rocket="rocket"></rocket-general-info>
    </div>
    <rocket-main-info-desktop
      v-if="actualWidth >= 1024"
      :rocket="isLoading ? {} : rocket"
    ></rocket-main-info-desktop>
    <rocket-main-info
      v-else
      :rocket="isLoading ? {} : rocket"
    ></rocket-main-info>
  </div>
</template>

<script>
import { rocketDetails } from "@/composables/api";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "@vue/reactivity";
import ImagesCollection from "@/components/ImagesCollection.vue";
import RocketGeneralInfo from "@/components/RocketDetails/RocketGeneralInfo.vue";
import RocketMainInfoDesktop from "@/components/RocketDetails/RocketMainInfoDesktop.vue";
import RocketMainInfo from "@/components/RocketDetails/RocketMainInfo.vue";
import { onBeforeUnmount, onMounted, watchEffect } from "vue";
import { useMeta } from "vue-meta";

export default {
  name: "RocketDetails",
  components: {
    ImagesCollection,
    RocketGeneralInfo,
    RocketMainInfoDesktop,
    RocketMainInfo,
  },
  setup() {
    const route = useRoute();
    const state = reactive({
      rocket: undefined,
      isLoading: true,
      actualWidth: document.documentElement.clientWidth,
    });
    rocketDetails(route.params.id)
      .then((data) => {
        state.rocket = data;
        state.isLoading = false;
      })
      .catch((error) => {
        console.log("Rocket error: ", error);
      });
    const updateWidth = () => {
      state.actualWidth = document.documentElement.clientWidth;
    };
    onMounted(() => {
      window.addEventListener("resize", updateWidth);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateWidth);
    });

    const { meta } = useMeta({
      title: `${state.rocket?.name ?? "Rocket"}`,
      description: `${state.rocket?.description ?? ""}`,
    });
    watchEffect(() => {
      meta.title = state.rocket?.name;
      meta.description = state.rocket?.description;
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
    @include responsive(medium-bp) {
      flex-direction: column-reverse;
    }
    .images-collection {
      &__selected-image {
        @include responsive(medium-bp) {
          height: 45rem;
        }
        @include responsive(small-bp) {
          height: 35rem;
        }
        @include responsive(smallest-bp) {
          height: 25rem;
        }
      }
    }
  }
}
</style>

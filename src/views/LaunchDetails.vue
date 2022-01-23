<template>
  <div class="launch-details">
    <launch-general-info :launch="launch" />
    <images-collection
      class="launch-details__launch-images"
      v-if="launch?.links.flickr.original.length"
      :images="isLoading ? [] : launch.links.flickr.original"
    ></images-collection>
    <launch-ships-info :launch="launch"></launch-ships-info>
    <iframe
      class="launch-details__youtube-player"
      allowfullscreen="true"
      :src="`https://www.youtube.com/embed/${launch?.links?.youtube_id}`"
    >
    </iframe>
  </div>
</template>

<script>
import { launchDetails } from "@/composables/api";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "@vue/reactivity";
import ImagesCollection from "@/components/ImagesCollection.vue";
import LaunchGeneralInfo from "@/components/LaunchDetails/LaunchGeneralInfo.vue";
import LaunchShipsInfo from "@/components/LaunchDetails/LaunchShipsInfo.vue";

export default {
  name: "LaunchDetails",
  components: {
    ImagesCollection,
    LaunchGeneralInfo,
    LaunchShipsInfo,
  },
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
.launch-details {
  &__launch-images {
    .images-collection {
      margin-bottom: 2rem;
      &__selected-image {
        height: 680px;
        border-radius: 10px;
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
    margin-bottom: 2rem;
  }
  &__youtube-player {
    width: 100%;
    height: 68rem;
    border-radius: 10px;
    border: 2px solid $star-command-blue;
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
</style>


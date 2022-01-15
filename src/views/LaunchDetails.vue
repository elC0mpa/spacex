<template>
  <div class="launch-details">
    <div class="launch-details__general-info">
      <images-collection
        :images="isLoading ? [] : launch.links.flickr.original"
      ></images-collection>
    </div>
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

export default {
  name: "LaunchDetails",
  components: {
    ImagesCollection,
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
  &__general-info {
    display: flex;
    justify-content: space-between;
    > * {
      flex: 0 0 45%;
    }
    margin-bottom: 2rem;
  }
  &__youtube-player {
    width: 100%;
    height: 680px;
    border-radius: 10px;
    border: 2px solid $star-command-blue;
  }
}
</style>


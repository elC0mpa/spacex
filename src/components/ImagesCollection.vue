<template>
  <div class="images-collection">
    <img
      class="images-collection__selected-image"
      :src="images[selectedImage]"
    />
    <div class="images-collection__images-container">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        :class="{ 'bordered-image': index === selectedImage }"
        @click="imageClicked(index)"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
export default {
  name: "ImagesCollection",
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
      selectedImage: 0,
    });
    const imageClicked = (index) => {
      state.selectedImage = index;
      context.emit("image-changed", index);
    };
    return { ...toRefs(state), props, imageClicked };
  },
};
</script>

<style lang="scss" scoped>
.images-collection {
  display: flex;
  flex-direction: column;
  &__selected-image {
    height: 30rem;
    width: 100%;
    box-shadow: 1px 1px 20px #000;
    border-radius: 1rem;
  }
  &__images-container {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    column-gap: 25px;
    row-gap: 10px;
    @include responsive(smallest-bp) {
      grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
      column-gap: 1rem;
    }
    img {
      height: 7rem;
      width: 100%;
      &.bordered-image {
        border: 4px solid $star-command-blue;
      }
      @include responsive(smallest-bp) {
        height: 5rem;
      }
    }
  }
}
</style>

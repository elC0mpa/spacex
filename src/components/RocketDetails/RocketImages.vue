<template>
  <div class="rocket-images">
    <img class="rocket-images__selected-image" :src="images[selectedImage]" />
    <div class="rocket-images__images-container">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        :class="{ 'bordered-image': index === selectedImage }"
        @click="selectedImage = index"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
export default {
  name: "RocketImages",
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      selectedImage: 0,
    });
    return { ...toRefs(state), props };
  },
};
</script>

<style lang="scss" scoped>
.rocket-images {
  display: flex;
  flex-direction: column;
  &__selected-image {
    height: 30rem;
    width: 100%;
    box-shadow: 1px 1px 20px #000;
  }
  &__images-container {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    column-gap: 25px;
    row-gap: 10px;
    img {
      height: 7rem;
      width: 10rem;
      &.bordered-image {
        border: 4px solid $star-command-blue;
      }
    }
  }
}
</style>

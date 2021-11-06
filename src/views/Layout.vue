<template>
  <div>
    <navigation-button
      :items="[
        { label: 'Home', to: '/' },
        { label: 'Launches', to: '/launches' },
        { label: 'Rockets', to: '/rockets' },
      ]"
    ></navigation-button>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationButton from "@/components/NavigationButton";
export default {
  name: "Layout",
  components: {
    NavigationButton,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

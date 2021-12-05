<template>
  <div
    class="main-layout"
    :class="{
      'is-home': route.name === 'Home',
      'is-rockets': route.name === 'Rockets',
      'is-rocket-details': route.name === 'RocketDetails',
    }"
  >
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
import { useRoute } from "vue-router";
export default {
  name: "Layout",
  components: {
    NavigationButton,
  },
  setup() {
    const route = useRoute();
    return { route };
  },
};
</script>

<style lang="scss" scoped>
.main-layout {
  padding: 10rem 20%;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  &.is-home {
    background-image: url("../assets/images/background-home.jpg");
    background-position: top;
    height: 100vh;
  }
  &.is-rockets {
    background-image: url("../assets/images/background-rockets.jpeg");
    background-position: center;
    min-height: 100vh;
  }
  &.is-rocket-details {
    background: white;
    background-position: center;
    min-height: 100vh;
  }
}
</style>

<template>
  <div class="home">
    <navigation-button></navigation-button>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationButton from "@/components/NavigationButton";
import { nextLaunchInfo } from "@/composables/api";
export default {
  name: "Home",
  components: {
    NavigationButton,
  },
  setup() {
    const data = nextLaunchInfo();
    console.log("Next launch info: ", data);
  },
};
</script>

<style lang="scss"></style>

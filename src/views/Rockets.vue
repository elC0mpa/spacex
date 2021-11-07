<template>
  <div>Rockets view</div>
</template>

<script>
import { rocketsInfo } from "@/composables/api";
export default {
  name: "Rockets",
  setup() {
    rocketsInfo()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Next launch error: ", error);
      });
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

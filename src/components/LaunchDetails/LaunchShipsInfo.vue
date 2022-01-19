<template>
  <div class="launch-ships-info">
    <images-collection
      :images="shipsImages"
      @image-changed="updateShip"
    ></images-collection>
    <ship-general-info :ship="selectedShip"></ship-general-info>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import ImagesCollection from "@/components/ImagesCollection.vue";
import ShipGeneralInfo from "./ShipGeneralInfo.vue";
export default {
  components: { ImagesCollection, ShipGeneralInfo },
  name: "LaunchShipsInfo",
  props: {
    launch: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      selectedShipIndex: 0,
    });
    const selectedShip = computed(() => {
      return props.launch?.ships?.length
        ? props.launch.ships.filter((ship) => ship.image)[
            state.selectedShipIndex
          ]
        : undefined;
    });
    const shipsImages = computed(() => {
      return props.launch?.ships?.length
        ? props.launch.ships
            .map((ship) => ship.image)
            .filter((shipImage) => shipImage)
        : [];
    });
    const updateShip = (index) => {
      state.selectedShipIndex = index;
    };
    return { props, shipsImages, updateShip, selectedShip };
  },
};
</script>

<style lang="scss">
.launch-ships-info {
  display: flex;
  justify-content: space-between;
  > * {
    flex: 0 0 45%;
  }
  margin-bottom: 2rem;
}
</style>




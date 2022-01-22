<template>
  <div class="launchpad-details">
    <p class="launchpad-details__name">{{ launchpad?.full_name }}</p>
    <div class="launchpad-details__map" id="map"></div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import { watch } from "vue";

export default {
  name: "LaunchPadDetails",
  props: {
    launchpad: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    let map;
    watch(
      () => props.launchpad,
      (actual) => {
        if (actual) {
          const { launchpad } = props;
          console.log("launchpad in map: ", launchpad);
          map = leaflet.map("map", {
            center: new leaflet.latLng(
              launchpad?.latitude,
              launchpad?.longitude
            ),
            zoom: 9,
          });
          leaflet
            .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            })
            .addTo(map);
          leaflet
            .marker([launchpad?.latitude, launchpad?.longitude])
            .bindPopup(`<b>${launchpad.full_name}</b>`)
            .addTo(map);
        }
      }
    );

    return { props };
  },
};
</script>

<style lang="scss">
.launchpad-details {
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 1.5rem;
  border-radius: 1rem;
  &__name {
    @include main-text;
    font-size: 4rem;
  }
  &__map {
    position: static;
    margin-top: 2rem;
    width: 100%;
    height: 40rem;
  }
}
</style>



<template>
  <div class="launchpad-details">
    <p class="launchpad-details__name">{{ launchpad?.full_name }}</p>
    <div class="launchpad-details__map">
      <l-map
        v-if="launchpad"
        :zoom="zoom"
        :center="[launchpad?.latitude, launchpad?.longitude]"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker
          v-if="launchpad"
          :lat-lng="{
            lat: launchpad?.latitude,
            lng: launchpad?.longitude,
          }"
        >
          <l-tooltip>
            {{ launchpad?.full_name }}
          </l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";

export default {
  name: "LaunchPadDetails",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  props: {
    launchpad: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      zoom: 12,
      url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    };
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
    margin-top: 2rem;
    width: 100%;
    height: 40rem;
    outline: 2px solid $star-command-blue;
  }
}
</style>



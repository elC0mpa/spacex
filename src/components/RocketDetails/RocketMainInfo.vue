<template>
  <div class="rocket-main-info">
    <div class="rocket-main-info__titles-container">
      <p class="rocket-main-info__prev-title" @click="actualInfo--">
        {{ actualInfo === 0 ? "" : "&#8612;" }}
      </p>
      <p class="rocket-main-info__title">
        {{ titles[actualInfo] }}
      </p>
      <p class="rocket-main-info__next-title" @click="actualInfo++">
        {{ actualInfo === titles.length - 1 ? "" : "&#8614;" }}
      </p>
    </div>
    <info-row
      v-for="(row, index) in rows"
      :label="row.prop"
      :value="row.value"
      :key="index"
    />
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "@vue/reactivity";
import InfoRow from "@/components/InfoRow.vue";
import { getRowsPerCategory } from "@/composables/utilities";

export default {
  components: { InfoRow },
  name: "RocketMainInfo",
  props: {
    rocket: {
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      actualInfo: 0,
      titles: ["Overview", "Engine", "First Stage", "Second Stage", "Payloads"],
    });
    const rows = computed(() => {
      return getRowsPerCategory(props.rocket, state.actualInfo);
    });
    return { props, ...toRefs(state), rows };
  },
};
</script>

<style lang="scss" scoped>
.rocket-main-info {
  @include info-card;
  margin: 3rem auto 0 auto;
  &__titles-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    @include main-text;
    text-align: center;
    flex-grow: 3;
  }
  &__next-title,
  &__prev-title {
    @include main-text;
    font-size: 2rem;
    text-align: center;
    cursor: pointer;
    flex-grow: 1;
  }
  &__next-title,
  &__prev-title {
    @include main-text;
    text-align: center;
    cursor: pointer;
  }
}
</style>

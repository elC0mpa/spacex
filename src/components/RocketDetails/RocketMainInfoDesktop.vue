<template>
  <div class="rocket-main-info-desktop">
    <div class="rocket-main-info-desktop__first-column">
      <div class="rocket-main-info-desktop__first-column-titles-container">
        <p
          class="rocket-main-info-desktop__first-column-prev-title"
          @click="decreaseInfo"
        >
          {{ actualInfoFirstColumn === 0 ? "" : "&#8612;" }}
        </p>
        <p class="rocket-main-info-desktop__first-column-title">
          {{ titles[actualInfoFirstColumn] }}
        </p>
      </div>
      <info-row
        v-for="(row, index) in rowsFirstColumn"
        :label="row.prop"
        :value="row.value"
        :key="index"
      />
    </div>
    <div class="rocket-main-info-desktop__second-column">
      <div class="rocket-main-info-desktop__second-column-titles-container">
        <p class="rocket-main-info-desktop__second-column-title">
          {{ titles[actualInfoSecondColumn] }}
        </p>
        <p
          class="rocket-main-info-desktop__second-column-next-title"
          @click="increaseInfo"
        >
          {{ actualInfoSecondColumn === titles.length - 1 ? "" : "&#8614;" }}
        </p>
      </div>
      <info-row
        v-for="(row, index) in rowsSecondColumn"
        :label="row.prop"
        :value="row.value"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "@vue/reactivity";
import InfoRow from "@/components/InfoRow.vue";
import { getRowsPerCategory } from "@/composables/utilities";

export default {
  components: { InfoRow },
  name: "RocketMainInfoDesktop",
  props: {
    rocket: {
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      actualInfoFirstColumn: 0,
      actualInfoSecondColumn: 1,
      titles: ["Overview", "Engine", "First Stage", "Second Stage", "Payloads"],
    });

    const increaseInfo = () => {
      state.actualInfoFirstColumn++;
      state.actualInfoSecondColumn++;
    };

    const decreaseInfo = () => {
      state.actualInfoFirstColumn--;
      state.actualInfoSecondColumn--;
    };

    const rowsFirstColumn = computed(() => {
      return getRowsPerCategory(props.rocket, state.actualInfoFirstColumn);
    });

    const rowsSecondColumn = computed(() => {
      return getRowsPerCategory(props.rocket, state.actualInfoSecondColumn);
    });

    return {
      props,
      ...toRefs(state),
      rowsFirstColumn,
      rowsSecondColumn,
      increaseInfo,
      decreaseInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.rocket-main-info-desktop {
  display: flex;
  justify-content: space-between;
  &__first-column,
  &__second-column {
    flex: 0 0 45%;
    &-titles-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-title {
      @include main-text;
      text-align: center;
    }
    &-next-title,
    &-prev-title {
      @include main-text;
      cursor: pointer;
      text-align: center;
    }
  }
}
</style>

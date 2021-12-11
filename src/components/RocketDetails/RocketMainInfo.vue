<template>
  <div class="rocket-main-info">
    <p class="rocket-main-info__title">
      {{ titles[actualInfo] }}
    </p>
    {{ rows }}
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "@vue/reactivity";
export default {
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
      const info = [];
      if (Object.keys(props.rocket).length === 0) {
        return [];
      }
      switch (state.actualInfo) {
        case 0:
          info.push({
            prop: "Height",
            value: `${props.rocket?.height.meters} meters | ${props.rocket?.height.feet} feet`,
          });
          info.push({
            prop: "Diameter",
            value: `${props.rocket?.diameter.meters} meters | ${props.rocket?.diameter.feet} feet`,
          });
          info.push({
            prop: "Stages",
            value: `${props.rocket?.stages}`,
          });
          break;
        case 1:
          info.push({
            prop: "Type",
            value: `${props.rocket?.engines.type}`,
          });
          info.push({
            prop: "Amount",
            value: `${props.rocket?.engines.number}`,
          });
          info.push({
            prop: "Version",
            value: `${props.rocket?.engines.version}`,
          });
          info.push({
            prop: "Layout",
            value: `${props.rocket?.engines.layout}`,
          });
          info.push({
            prop: "Max Loss",
            value: `${props.rocket?.engines.engine_loss_max}`,
          });
          info.push({
            prop: "Propellant 1",
            value: `${props.rocket?.engines.propellant_1}`,
          });
          info.push({
            prop: "Propellant 2",
            value: `${props.rocket?.engines.propellant_2}`,
          });
          info.push({
            prop: "Specific Impulse",
            value: `${props.rocket?.isp.sea_level} (sea) | ${props.rocket?.isp.vaccum} (vaccum)`,
          });
          info.push({
            prop: "Thrust to Weight Ratio",
            value: `${props.rocket?.thrust_to_weight}`,
          });
          info.push({
            prop: "Sea Level Thrust",
            value: `${props.rocket?.thrust_sea_level.kN} kN | ${props.rocket?.thrust_sea_level.lbf} lbf `,
          });
          info.push({
            prop: "Vacuum Thrust",
            value: `${props.rocket?.thrust_vacuum.kN} kN | ${props.rocket?.thrust_vacuum.lbf} lbf `,
          });
          break;
        case 2:
          info.push({
            prop: "Engines",
            value: `${props.rocket?.first_stage.engines}`,
          });
          info.push({
            prop: "Burn Time",
            value: `${props.rocket?.first_stage.burn_time_sec} sec`,
          });
          info.push({
            prop: "Fuel Amount",
            value: `${props.rocket?.first_stage.fuel_amount_tons} ton`,
          });
          info.push({
            prop: "Reusable",
            value: props.rocket?.first_stage.engines ? "Yes" : "No",
          });
          info.push({
            prop: "Sea Level Thrust",
            value: `${props.rocket?.first_stage.thrust_sea_level.kN} kN | ${props.rocket?.first_stage.thrust_sea_level.lbf} lbf`,
          });
          info.push({
            prop: "Vacuum Thrust",
            value: `${props.rocket?.first_stage.thrust_vacuum.kN} kN | ${props.rocket?.first_stage.thrust_vacuum.lbf} lbf`,
          });
          break;
        case 3:
          info.push({
            prop: "Engines",
            value: `${props.rocket?.second_stage.engines}`,
          });
          info.push({
            prop: "Burn Time",
            value: `${props.rocket?.second_stage.burn_time_sec} sec`,
          });
          info.push({
            prop: "Fuel Amount",
            value: `${props.rocket?.second_stage.fuel_amount_tons} ton`,
          });
          info.push({
            prop: "Reusable",
            value: props.rocket?.second_stage.engines ? "Yes" : "No",
          });
          info.push({
            prop: "Thrust",
            value: `${props.rocket?.second_stage.thrust.kN} kN | $${props.rocket?.second_stage.thrust.lbf} lbf`,
          });
          info.push({
            prop: "Fairing Type",
            value: `${props.rocket?.second_stage.payloads.option_1}`,
          });
          info.push({
            prop: "Fairing Height",
            value: `${props.rocket?.second_stage.payloads.composite_fairing.height.meters} meters | ${props.rocket?.second_stage.payloads.composite_fairing.height.feet} feet`,
          });
          info.push({
            prop: "Fairing Diameter",
            value: `${props.rocket?.second_stage.payloads.composite_fairing.diameter.meters} meters | ${props.rocket?.second_stage.payloads.composite_fairing.diameter.feet} feet`,
          });
          break;
      }
      return info;
    });
    return { props, ...toRefs(state), rows };
  },
};
</script>

<style lang="scss" scoped>
.rocket-main-info {
  width: 50%;
  margin: 3rem auto 0 auto;
  &__title {
    @include main-text;
    text-align: center;
  }
}
</style>

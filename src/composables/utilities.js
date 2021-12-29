export const getRowsPerCategory = (rocket, index) => {
  const info = [];
  if (Object.keys(rocket).length === 0) {
    return [];
  }
  switch (index) {
    case 0:
      info.push({
        prop: "Height",
        value: `${rocket?.height.meters} meters | ${rocket?.height.feet} feet`,
      });
      info.push({
        prop: "Diameter",
        value: `${rocket?.diameter.meters} meters | ${rocket?.diameter.feet} feet`,
      });
      info.push({
        prop: "Stages",
        value: `${rocket?.stages}`,
      });
      break;

    case 1:
      info.push({
        prop: "Type",
        value: `${rocket?.engines.type}`,
      });
      info.push({
        prop: "Amount",
        value: `${rocket?.engines.number}`,
      });
      info.push({
        prop: "Version",
        value: `${rocket?.engines.version}`,
      });
      info.push({
        prop: "Layout",
        value: `${rocket?.engines.layout}`,
      });
      info.push({
        prop: "Max Loss",
        value: `${rocket?.engines.engine_loss_max}`,
      });
      info.push({
        prop: "Propellant 1",
        value: `${rocket?.engines.propellant_1}`,
      });
      info.push({
        prop: "Propellant 2",
        value: `${rocket?.engines.propellant_2}`,
      });
      info.push({
        prop: "Specific Impulse",
        value: `${rocket?.engines.isp.sea_level} (sea) | ${rocket?.engines.isp.vacuum} (vacuum)`,
      });
      info.push({
        prop: "Thrust to Weight Ratio",
        value: `${rocket?.engines.thrust_to_weight}`,
      });
      info.push({
        prop: "Sea Level Thrust",
        value: `${rocket?.engines.thrust_sea_level.kN} kN | ${rocket?.engines.thrust_sea_level.lbf} lbf `,
      });
      info.push({
        prop: "Vacuum Thrust",
        value: `${rocket?.engines.thrust_vacuum.kN} kN | ${rocket?.engines.thrust_vacuum.lbf} lbf `,
      });
      break;

    case 2:
      info.push({
        prop: "Engines",
        value: `${rocket?.first_stage.engines}`,
      });
      info.push({
        prop: "Burn Time",
        value: `${rocket?.first_stage.burn_time_sec} sec`,
      });
      info.push({
        prop: "Fuel Amount",
        value: `${rocket?.first_stage.fuel_amount_tons} ton`,
      });
      info.push({
        prop: "Reusable",
        value: rocket?.first_stage.engines ? "Yes" : "No",
      });
      info.push({
        prop: "Sea Level Thrust",
        value: `${rocket?.first_stage.thrust_sea_level.kN} kN | ${rocket?.first_stage.thrust_sea_level.lbf} lbf`,
      });
      info.push({
        prop: "Vacuum Thrust",
        value: `${rocket?.first_stage.thrust_vacuum.kN} kN | ${rocket?.first_stage.thrust_vacuum.lbf} lbf`,
      });
      break;

    case 3:
      info.push({
        prop: "Engines",
        value: `${rocket?.second_stage.engines}`,
      });
      info.push({
        prop: "Burn Time",
        value: `${rocket?.second_stage.burn_time_sec} sec`,
      });
      info.push({
        prop: "Fuel Amount",
        value: `${rocket?.second_stage.fuel_amount_tons} ton`,
      });
      info.push({
        prop: "Reusable",
        value: rocket?.second_stage.engines ? "Yes" : "No",
      });
      info.push({
        prop: "Thrust",
        value: `${rocket?.second_stage.thrust.kN} kN | $${rocket?.second_stage.thrust.lbf} lbf`,
      });
      info.push({
        prop: "Fairing Type",
        value: `${rocket?.second_stage.payloads.option_1}`,
      });
      info.push({
        prop: "Fairing Height",
        value: `${rocket?.second_stage.payloads.composite_fairing.height.meters} meters | ${rocket?.second_stage.payloads.composite_fairing.height.feet} feet`,
      });
      info.push({
        prop: "Fairing Diameter",
        value: `${rocket?.second_stage.payloads.composite_fairing.diameter.meters} meters | ${rocket?.second_stage.payloads.composite_fairing.diameter.feet} feet`,
      });
      break;

    case 4:
      rocket?.payload_weights.forEach((payload) => {
        info.push({
          prop: payload.name,
          value: `${payload.kg} kgs | ${payload.lb} lbs`,
        });
      });
      break;
  }
  return info;
};

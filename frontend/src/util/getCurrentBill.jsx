import { getRDB } from "./getRealTimeDb";

export async function getCurrentBill(dataUnit) {
  const refPath = `Rates/`;
  const rate = await getRDB(refPath);
  // console.log("rate.type", rate.type);

  const cubicMeters = dataUnit / 1000;

  // equation for linear
  if (rate.type === "linear") {
    const billAmount = (cubicMeters * rate.value).toFixed(2);
    return billAmount;
  }
  // equation for step pricing
  if (rate.type === "step_pricing") {
    const adjustedCubicMeters = Math.ceil(cubicMeters);
    const billAmount = (adjustedCubicMeters * rate.value).toFixed(2);

    return billAmount;
  }
  // equation similar to maynilad
  if (rate.type === "maynilad") {
    const basicMinimumCharge = 130.57;
    const ratePastTenCubicMeters = 27.14;
    const ratePastTwentyCubicMeters = 79.22;
    const ratePastFiftyCubicMeters = 86.64;
    const ratePastFiftyOneCubicMeters = 90.51;
    const ratePastTwoHundredCubicMeters = 94.33;
    let billAmount;
    if (cubicMeters <= 0) {
      billAmount = 0;
    } else if (cubicMeters <= 10) {
      billAmount = basicMinimumCharge;
    } else if (cubicMeters <= 20) {
      billAmount =
        basicMinimumCharge + (cubicMeters - 10) * ratePastTenCubicMeters;
    } else if (cubicMeters <= 50) {
      billAmount =
        basicMinimumCharge +
        10 * ratePastTenCubicMeters +
        (cubicMeters - 20) * ratePastTwentyCubicMeters;
    } else if (cubicMeters <= 51) {
      billAmount =
        basicMinimumCharge +
        10 * ratePastTenCubicMeters +
        30 * ratePastTwentyCubicMeters +
        (cubicMeters - 50) * ratePastFiftyCubicMeters;
    } else if (cubicMeters <= 200) {
      billAmount =
        basicMinimumCharge +
        10 * ratePastTenCubicMeters +
        30 * ratePastTwentyCubicMeters +
        ratePastFiftyCubicMeters +
        (cubicMeters - 51) * ratePastFiftyOneCubicMeters;
    } else {
      billAmount =
        basicMinimumCharge +
        10 * ratePastTenCubicMeters +
        30 * ratePastTwentyCubicMeters +
        ratePastFiftyCubicMeters +
        149 * ratePastFiftyOneCubicMeters +
        (cubicMeters - 200) * ratePastTwoHundredCubicMeters;
    }
    return billAmount;
  }
}

// most definitely will not be used
export function sampleBill(dataUnit, rate, type) {
  const cubicMeters = dataUnit / 1000;
  if (type === "linear") {
    return cubicMeters * rate;
  }
  if (type === "stepRate") {
    const adjustedCubicMeters = Math.ceil(cubicMeters);
    const billAmount = adjustedCubicMeters * Number(rate);
    console.log(billAmount);
    return billAmount;
  }

  if (type === "maynilad") {
    const basicMinimumCharge = 130.57;
    const ratePastTenCubicMeters = 27.14;
    const ratePastTwentyCubicMeters = 79.22;
    const ratePastFiftyCubicMeters = 86.64;
    const ratePastFiftyOneCubicMeters = 90.51;
    const ratePastTwoHundredCubicMeters = 94.33;
    let billAmount;
    if (cubicMeters <= 0) {
      billAmount = 0;
    } else if (cubicMeters <= 10) {
      billAmount = basicMinimumCharge;
    } else if (cubicMeters <= 20) {
      billAmount =
        basicMinimumCharge + (cubicMeters - 10) * ratePastTenCubicMeters;
    } else if (cubicMeters <= 50) {
      billAmount =
        basicMinimumCharge +
        10 * ratePastTenCubicMeters +
        (cubicMeters - 20) * ratePastTwentyCubicMeters;
    } else if (cubicMeters <= 51) {
      billAmount =
        basicMinimumCharge +
        10 * ratePastTenCubicMeters +
        30 * ratePastTwentyCubicMeters +
        (cubicMeters - 50) * ratePastFiftyCubicMeters;
    } else if (cubicMeters <= 200) {
      billAmount =
        basicMinimumCharge +
        10 * ratePastTenCubicMeters +
        30 * ratePastTwentyCubicMeters +
        ratePastFiftyCubicMeters +
        (cubicMeters - 51) * ratePastFiftyOneCubicMeters;
    } else {
      billAmount =
        basicMinimumCharge +
        10 * ratePastTenCubicMeters +
        30 * ratePastTwentyCubicMeters +
        ratePastFiftyCubicMeters +
        149 * ratePastFiftyOneCubicMeters +
        (cubicMeters - 200) * ratePastTwoHundredCubicMeters;
    }
    return billAmount;
  }
}

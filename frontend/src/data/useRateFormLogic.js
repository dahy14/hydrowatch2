import { useState, useEffect } from "react";
import { setRDB } from "../util/getRealTimeDb";

const useRateFormLogic = () => {
  const [rateType, setRateType] = useState("maynilad");
  const [valuePerM3, setValuePerM3] = useState("");

  const handleRateChange = (type) => {
    const lowerCaseType = type.toLowerCase().replace(" ", "_");
    setRateType(lowerCaseType);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // console.log("Input Value: ", inputValue);
    if (inputValue === "" || /^[0-9]+(\.[0-9]+)?$/.test(inputValue)) {
      setValuePerM3(inputValue);
    }
  };

  const calculateSamples = () => {
    const parsedValuePerM3 = parseFloat(valuePerM3);
    if (isNaN(parsedValuePerM3)) {
      return ["Enter a valid value"];
    }
    if (rateType === "maynilad") {
      return [
        { volume: 0.9, price: 130.57 },
        { volume: 1.4, price: 130.57 },
        { volume: 2.5, price: 130.57 },
      ];
    }
    if (rateType === "step_pricing") {
      const rates = [
        { volume: 0.9, price: parsedValuePerM3 },
        { volume: 1.4, price: parsedValuePerM3 + parsedValuePerM3 },
        {
          volume: 2.5,
          price: parsedValuePerM3 + parsedValuePerM3 + parsedValuePerM3,
        },
      ];
      return rates;
    }

    if (rateType === "linear") {
      const result = [
        { volume: 0.9, price: 0.9 * parsedValuePerM3 },
        { volume: 1.4, price: 1.4 * parsedValuePerM3 },
        { volume: 2.5, price: 2.5 * parsedValuePerM3 },
      ];
      return result;
    }

    return [
      { volume: 0.9, price: 0.9 * parsedValuePerM3 },
      { volume: 1.4, price: 1.4 * parsedValuePerM3 },
      { volume: 2.5, price: 2.5 * parsedValuePerM3 },
    ];
  };
  useEffect(() => {
    // console.log("Samples: ", calculateSamples());
  }, [rateType, valuePerM3]);

  const handleSaveChange = () => {
    const refPath = `Rates/`;
    const data = {
      value: valuePerM3,
      type: rateType,
    };
    if (valuePerM3 <= 0 && rateType !== "maynilad") {
      alert("Rate value should be greater than 0");
      return;
    }

    setRDB(refPath, { data });
    console.log("new Rates updated");
  };

  return {
    rateType,
    valuePerM3,
    handleRateChange,
    handleInputChange,
    calculateSamples,
    handleSaveChange,
  };
};

export default useRateFormLogic;

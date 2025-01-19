import React from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";

import ThemeContextProvider from "../../context/ThemeContextProvider";
import useRateFormLogic from "../../data/useRateFormLogic";

const Rate = () => {
  const {
    rateType,
    valuePerM3,
    handleRateChange,
    handleInputChange,
    calculateSamples,
    handleSaveChange,
  } = useRateFormLogic();

  return (
    <ThemeContextProvider>
      <div className="flex">
        <Sidebar />
        <div className="grow ml-16 md:ml-64 h-full lg:h-cover bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white ">
          <Navbar />
          <div className="p-8 min-h-screen">
            <h2 className="text-lg font-semibold mb-6 ">
              Change Tenant Water Rate
            </h2>
            <div className="max-w-8xl mx-auto bg-white dark:bg-gray-800 dark:border dark:border-gray-700 p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col space-y-4 w-full md:w-1/3">
                  <label className="text-sm font-medium dark:text-gray-300">
                    Rate Type
                  </label>
                  <div className="space-y-2">
                    {["Linear", "Step Pricing", "Maynilad"].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleRateChange(type)}
                        className={`block w-full text-left px-4 py-2 rounded-lg border dark:border-gray-700 ${
                          rateType === type.toLowerCase().replace(" ", "_")
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 "
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium dark:text-gray-300">
                    Value per m³
                  </label>
                  <input
                    type="number"
                    value={valuePerM3}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (
                        e.key === "e" ||
                        e.key === "E" ||
                        e.key === "+" ||
                        e.key === "-"
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className="w-full mt-2 px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                    step="0.01"
                  />

                  <div className="mt-4">
                    <h3 className="text-md font-medium dark:text-gray-300">
                      Sample Calculations
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm dark:text-gray-400">
                      {calculateSamples().length > 0 ? (
                        calculateSamples().map((sample, index) => (
                          <li key={index}>
                            {typeof sample === "object" &&
                            sample.volume !== undefined &&
                            sample.price !== undefined
                              ? `${sample.volume} m³: ${sample.price.toFixed(
                                  2
                                )} PHP`
                              : sample}
                          </li>
                        ))
                      ) : (
                        <li>No sample calculations available.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-right text-sm">
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                  onClick={handleSaveChange}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  );
};

export default Rate;

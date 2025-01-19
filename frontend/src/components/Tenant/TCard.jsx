import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getCurrentBill } from "../../util/getCurrentBill";

const TCard = ({ id, name, vol, date }) => {
  const [bill, setBill] = useState(0);
  const liters = vol;
  const maxLiters = 3000;
  const percentage = (liters / maxLiters) * 100;
  useEffect(() => {
    const fetchBill = async () => {
      const dataUnit = vol;
      const billAmount = await getCurrentBill(dataUnit);
      // console.log(billAmount);
      setBill(billAmount);
    };
    fetchBill();
    // console.log("Bill: ", bill);
  });

  return (
    <div className="bg-white p-4 shadow-lg rounded-md flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 dark:bg-gray-800 dark:border dark:border-gray-700">
      {/* Meter container */}
      <div className="flex-2">
        <div className="w-48 h-48 sm:w-48 sm:h- md:w-48 md:h-48 lg:w-48 lg:h-48 xl:w-64 xl:h-64 ">
          <CircularProgressbar
            value={percentage}
            text={`${liters} L`}
            styles={buildStyles({
              textSize: "1rem",
              pathColor: "#3b82f6",
              textColor: "#3b82f6",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      </div>

      <div className="flex-auto w-full md:w-auto ml-0 md:ml-2 rounded-md">
        <div className="flex justify-between items-center mb-2 rounded-md">
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold text-blue-400 uppercase">
            {name}
          </p>
        </div>

        <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md dark:border dark:border-gray-700">
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg">
            Bill: ₱{bill}
          </p>
        </div>

        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md dark:border dark:border-gray-700 mb-2">
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg">
            Billing Period: {dayjs(date).format("MMMM ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TCard;

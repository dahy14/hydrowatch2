import React from "react";
import { GrView, GrFormClose } from "react-icons/gr";
import { useState } from "react";
import HistoricInvoice from "./HistoricInvoice";
import dayjs from "dayjs";

const MonthCard = ({ invoice }) => {
  const [isVisible, setIsVisible] = useState(false);
  const i = new Date(invoice.startDate.seconds * 1000);
  const start = dayjs(i).format("MMMM D, YYYY");
  const month = dayjs(i).format("MMMM");

  const j = new Date(invoice.endDate.seconds * 1000);
  const end = dayjs(j).format("MMMM D, YYYY");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="w-full max-w-screen-xl mx-auto p-2 dark:bg-cover text-gray-800 dark:text-white rounded-lg relative">
      <div className="mb-4 p-4 bg-white dark:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-700 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="text-base font-semibold text-left lg:text-lg">
            {`${month}`}
          </div>
          <div className="flex space-x-6">
            <button
              onClick={toggleVisibility}
              className="flex items-center dark:text-white hover:text-blue-700 dark:hover:text-blue-700 p-2 rounded-full"
            >
              {isVisible ? <GrFormClose size={15} /> : <GrView size={15} />}
              <span className="ml-1 text-xs sm:inline-block hidden">
                {isVisible ? "Close" : "View Invoice"}
              </span>
            </button>
          </div>
        </div>

        <div className={`m-4 ${isVisible ? "block" : "hidden"}`}>
          <HistoricInvoice
            bill={invoice.bill}
            billedTo={invoice.billedTo}
            consumption={invoice.consumption}
            startDate={start}
            endDate={end}
            refNumber={invoice.refNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default MonthCard;

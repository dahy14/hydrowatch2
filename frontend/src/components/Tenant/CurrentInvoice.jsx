import React, { useState, useEffect } from "react";
import { getCurrentBill } from "../../util/getCurrentBill";

const CurrentInvoice = ({ vol, name, ref, startDate, endDate }) => {
  const [bill, setBill] = useState(0);
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
    <div className="p-8 font-sans dark:bg-gray-900 text-gray-100 h-screen bg-cover">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl dark:bg-gray-800 dark:border dark:border-gray-700 text-gray-800 shadow-md p-6 ">
          <div className="flex justify-between text-sm">
            <div className="dark:text-gray-200 font-semibold">
              <p>
                <strong>Reference # :</strong> <span id="ref-CB">{ref}</span>
              </p>
              <p>
                <strong>Billed to :</strong>{" "}
                <span id="billed-to-CB">{name}</span>
              </p>
            </div>
            <div className="text-right">
              <img
                src="src/assets/logo2.png"
                alt="Logo"
                className="w-15 h-8 md:hidden"
              />
              <img
                src="src/assets/logotr.png"
                alt="Logo"
                className="hidden md:block w-15 h-16"
              />
            </div>
          </div>

          <div className="flex justify-between mt-10 text-sm dark:text-white">
            <div className="text-left">
              <p className="dark:text-gray-200 font-semibold">
                Collection Period
              </p>
              <p>Start Date</p>
              <p>End Date</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">-</p>
              <p id="start-CB">{startDate}</p>
              <p id="end-CB">{endDate}</p>
            </div>
          </div>

          <div className="mt-10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border border-gray-300 text-left p-2 bg-blue-800 text-white">
                    Consumption / m³
                  </th>
                  <th className="border border-gray-300 text-right p-2 bg-blue-800 text-white">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="dark:text-white border border-gray-300">
                  <td id="consumption-CB" className="text-left p-2">
                    {Number(vol / 1000).toFixed(3)}
                  </td>
                  <td
                    id="bill2-CB"
                    className="border border-gray-300 text-right p-2"
                  >
                    P{bill}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <p className="text-base font-bold dark:text-white">
                Total: <span id="bill-CB">{bill}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 text-xs">
            <p className="text-gray-400">
              Please ensure timely payment to avoid service interruptions.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          Copyright 2024 - Hydrowatch. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default CurrentInvoice;

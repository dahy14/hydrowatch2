import React from "react";
const HistoricInvoice = ({
  bill,
  billedTo,
  consumption,
  startDate,
  endDate,
  refNumber,
}) => {
  return (
    <div className="font-sans dark:bg-gray-900 text-gray-100 h-auto bg-cover">
      <div className="flex justify-center">
        <div className="w-full max-w-5xl dark:bg-gray-800 dark:border dark:border-gray-700 text-gray-800 shadow-md p-3 ">
          <div className="flex justify-between text-xs sm:text-sm">
            <div className="dark:text-gray-200 font-semibold">
              <p>
                <strong>Reference # :</strong>{" "}
                <span id="ref-CB">{refNumber}</span>
              </p>
              <p>
                <strong>Billed to :</strong>{" "}
                <span id="billed-to-CB">{billedTo}</span>
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

          <div className="flex justify-between mt-10 text-xs sm:text-sm dark:text-white">
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
            <table className="w-full border-collapse text-xs sm:text-sm">
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
                    {Number(consumption / 1000).toFixed(3)}
                  </td>
                  <td
                    id="bill2-CB"
                    className="border border-gray-300 text-right p-2"
                  >
                    {bill}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <p className="text-xs font-bold dark:text-white sm:text-sm">
                Total: <span id="bill-CB">{bill}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 text-xs sm:text-sm">
            <p className="text-gray-400">
              Please ensure timely payment to avoid service interruptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricInvoice;

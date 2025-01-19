import React, { useState, useEffect } from "react";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import Valvecard from "../../components/Admin/Valvecard";

import ThemeContextProvider from "../../context/ThemeContextProvider";

import { getRDB } from "../../util/getRealTimeDb";
import { getDataLocallyOrNah } from "../../util/localDb";

const SolenoidData = await getRDB("SolenoidData");

function Valve() {
  const [tenantData, setTenantData] = useState([]);
  const [solState, setSolState] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      const tenantSnap = await getDataLocallyOrNah("tenant"); // get tenant data || needs once
      tenantSnap.shift();
      setTenantData(tenantSnap);
      tenantData.forEach(async (tenant) => {
        const refpath = `SolenoidData/${tenant.deviceId}`;
        const solData = await getRDB(refpath);
        data.push(solData);
        setSolState(data);
      });
    };
    fetchData();
  }, []);
  return (
    <ThemeContextProvider>
      <div className="flex">
        <Sidebar />

        <div className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
          <Navbar />

          <div className="p-8 text-gray-900 dark:bg-gray-900 dark:bg-cover dark:bg-center dark:text-white min-h-screen">
            <h2 className="text-lg font-medium mb-6 text-center md:text-left">
              Turn Valve Off/On for Tenant
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
              {tenantData.map((tenant, index) => (
                <Valvecard
                  key={index}
                  name={tenant.name}
                  room={index + 1}
                  deviceId={tenant.deviceId}
                  state={SolenoidData[tenant.deviceId].solenoid}

                  // isValveOn={valveStatus[tenant.tenant]}
                  // toggleValve={() => toggleValve(tenant.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  );
}

export default Valve;

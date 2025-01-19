import React, { useState, useEffect } from "react";
import TCard from "../../components/Tenant/TCard";
import TNavbar from "../../components/Tenant/TNavbar";
import TSidebar from "../../components/Tenant/TSidebar";

import ThemeContextProvider from "../../context/ThemeContextProvider";
import { getRDB } from "../../util/getRealTimeDb";
import { getDataLocallyOrNah } from "../../util/localDb";

const LiveFeed = () => {
  const [roomUnit, setRoomUnit] = useState(NaN);
  const [_userData, set_UserData] = useState({});
  const [tenantData, setTenantData] = useState({});

  useEffect(() => {
    const aData = async () => {
      const tenantSnap = await getDataLocallyOrNah("tenant"); // get tenant data || needs once
      console.log("Tenant Snap", tenantSnap);
      setTenantData(tenantSnap);
      console.log(tenantData);
    };
    aData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getRDB(`UsersData/${tenantData.deviceId}`);
      set_UserData(data);
    };
    fetchUserData();
    const period = setInterval(fetchUserData, 1000);
    return () => clearInterval(period);
  }, [tenantData]);

  return (
    <ThemeContextProvider>
      <div className="flex">
        <TSidebar />
        <div className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
          <TNavbar />
          <div className="flex justify-center items-center p-8 text-gray-900 dark:bg-gray-900 dark:bg-cover dark:bg-center dark:text-white min-h-screen">
            <div className="w-full max-w-2xl h-[80vh]">
              {/* <h2 className="text-2xl mb-4"></h2> */}
              <TCard
                key={roomUnit}
                id={roomUnit}
                name={tenantData.name}
                vol={_userData.consumption}
                date={tenantData.timestamp}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  );
};

export default LiveFeed;

import React, { useEffect } from "react";
import Card from "../../components/Admin/Card";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";

import ThemeContextProvider from "../../context/ThemeContextProvider";
import { useState } from "react";
import { getRDB } from "../../util/getRealTimeDb";
import { getDataLocallyOrNah } from "../../util/localDb";
import { use } from "react";

const Dashboard = () => {
  const [_userData, set_UserData] = useState({});
  const [tenantData, setTenantData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getRDB("UsersData");
      const tenantSnap = await getDataLocallyOrNah("tenant"); // get tenant data || needs once
      tenantSnap.shift();
      set_UserData(data);
      setTenantData(tenantSnap);
    };
    fetchUserData();
    const period = setInterval(fetchUserData, 1000);
    return () => clearInterval(period);
  }, []);

  useEffect(() => {
    console.log("User Data", _userData);
    console.log("Tenant Data", tenantData);
  }, [tenantData]);

  return (
    <ThemeContextProvider>
      <div className="flex">
        <Sidebar />
        <div className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
          <Navbar />
          <div className="grow p-8 text-gray-900 dark:bg-gray-900 dark:bg-cover dark:bg-center dark:text-white min-h-screen">
            <h2 className="text-2xl mb-4"></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
              {tenantData.map((tenant, index) => (
                <Card
                  key={index}
                  id={index + 1}
                  name={tenant.name}
                  vol={_userData[tenant.deviceId].consumption}
                  date={_userData[tenant.deviceId].timestamp}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  );
};
export default Dashboard;

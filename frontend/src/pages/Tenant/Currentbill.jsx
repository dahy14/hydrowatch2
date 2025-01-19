import React, { useState, useEffect, useRef } from "react";
import TNavbar from "../../components/Tenant/TNavbar";
import TSidebar from "../../components/Tenant/TSidebar";
import ThemeContextProvider from "../../context/ThemeContextProvider";
import CurrentInvoice from "../../components/Tenant/CurrentInvoice";
import { getDataLocallyOrNah } from "../../util/localDb";
import { getRDB } from "../../util/getRealTimeDb";
import { retDate } from "../../util/checkDate";
import generateInvoice from "../../util/generateInvoice";
import { generateSecureUID } from "../../util/generateUID";
import dayjs from "dayjs";

const Currentbill = () => {
  const [_userData, set_UserData] = useState({});
  const [tenantData, setTenantData] = useState({});
  const [date, setDate] = useState({});
  const dateNow = useRef(dayjs());
  const id = useRef(null);
  useEffect(() => {
    const aData = async () => {
      const tenantSnap = await getDataLocallyOrNah("tenant"); // get tenant data || needs once
      console.log("Tenant Snap", tenantSnap);
      setTenantData(tenantSnap);
    };
    aData();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getRDB(`UsersData/${tenantData.deviceId}`);
        set_UserData(data);
        const d = retDate(data.timestamp);
        setDate(d);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
    const period = setInterval(fetchUserData, 1000);
    return () => clearInterval(period);
  }, [tenantData]);

  useEffect(() => {
    // to be honest there is no need to create this function, the simulation of new month is on the server, so the server will generate the invoice
    const difference = dateNow.current.diff(date.end, "day");
    if (dateNow.current.format("MMMM D, YYYY") === date.end) {
      generateInvoice(
        tenantData.name,
        _userData.consumption,
        date.start,
        date.end
      );
    }
  }, [_userData]);

  useEffect(() => {
    const generatedId = generateSecureUID();
    id.current = generatedId;
  }, []);

  return (
    <ThemeContextProvider>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <TSidebar />
        <div className="grow ml-16 md:ml-64 h-full">
          <TNavbar />
          <CurrentInvoice
            refNum={id.current}
            vol={_userData.consumption}
            name={tenantData.name}
            startDate={date.start}
            endDate={date.end}
          />
        </div>
      </div>
    </ThemeContextProvider>
  );
};

export default Currentbill;

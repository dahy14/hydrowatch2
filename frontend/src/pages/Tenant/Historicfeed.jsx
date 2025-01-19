import React, { useEffect, useRef, useState } from "react";
import MonthCard from "../../components/Tenant/Historic/MonthCard";
import TNavbar from "../../components/Tenant/TNavbar";
import TSidebar from "../../components/Tenant/TSidebar";
import { getInvoices } from "../../util/getFirestoreDb";
import { createLocalInvoice, getInvoiceLocally } from "../../util/localDb";
import { getDataLocallyOrNah, fixDateInvoice } from "../../util/localDb";
import ThemeContextProvider from "../../context/ThemeContextProvider";

const Historicfeed = () => {
  const invoiceSnap = useRef([]);
  const tenant = useRef(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      tenant.current = await getDataLocallyOrNah("tenant");
      if (window.localStorage.getItem("invoice")) {
        const invoice = getInvoiceLocally();
        invoiceSnap.current = invoice;
      } else {
        const invoice = await getInvoices(tenant.current.name);
        createLocalInvoice(invoice);
        invoiceSnap.current = invoice;
        // const a = fixDateInvoice(invoice);
        // console.log(a);
        // createLocalInvoice(a);
        // invoiceSnap.current = a;
      }
      setInvoices(invoiceSnap.current);
    };
    fetchData();
  }, []);
  return (
    <ThemeContextProvider>
      <div className="flex min-h-screen min-w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <TSidebar />
        <div className="flex-1 ml-16 md:ml-64 overflow-hidden">
          <TNavbar />

          <div className="flex flex-col items-center p-4 overflow-auto">
            {invoices.map((invoice, idx) => {
              return <MonthCard key={idx} invoice={invoice} />;
            })}
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  );
};

export default Historicfeed;

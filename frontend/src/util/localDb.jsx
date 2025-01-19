import { Timestamp } from "firebase/firestore";
import { getFDB, getInvoices } from "./getFirestoreDb";
/**CRED */
export function checkCredLocally() {}

export function getCredLocally() {
  const cred = localStorage.getItem("cred");
  return cred ? JSON.parse(cred) : null;
}

export function createLocalCred(cred) {
  localStorage.setItem("cred", JSON.stringify(cred));
}

/** TENANT */
export function getTenantLocally() {
  const tenant = localStorage.getItem("tenant");
  return tenant ? JSON.parse(tenant) : null;
}

export function createLocalTenant(tenant) {
  localStorage.setItem("tenant", JSON.stringify(tenant));
}

/**INVOICE */
export function getInvoiceLocally() {
  let invoice = localStorage.getItem("invoice");
  JSON.parse(invoice);
  //   invoice.startDate = Timestamp.fromDate(
  //     new Date(invoice.startDate.seconds * 1000)
  //   );
  //   invoice.endDate = Timestamp.fromDate(
  //     new Date(invoice.endDate.seconds * 1000)
  //   );
  //   invoice.timestamp = Timestamp.fromDate(
  //     new Date(invoice.timestamp.seconds * 1000)
  //   );

  return invoice ? JSON.parse(invoice) : null;
}

export function createLocalInvoice(invoice) {
  localStorage.setItem("invoice", JSON.stringify(invoice));
}

export function fixDateInvoice(invoice) {
  invoice.startDate = Timestamp.fromDate(
    new Date(invoice.startDate.seconds * 1000)
  );
  invoice.endDate = Timestamp.fromDate(
    new Date(invoice.endDate.seconds * 1000)
  );
  invoice.timestamp = Timestamp.fromDate(
    new Date(invoice.timestamp.seconds * 1000)
  );
  return invoice;
}
/** Check if it exist local */

export async function getDataLocallyOrNah(storedKey) {
  switch (storedKey) {
    case "tenant":
      let tenantSnap;
      if (window.localStorage.getItem("tenant")) {
        tenantSnap = getTenantLocally();
      } else {
        tenantSnap = await getFDB("tenants");
        console.log(tenantSnap);
        createLocalTenant(tenantSnap);
      }
      return tenantSnap;
    case "invoice":
      console.log("Dont go here its broken");
      if (window.localStorage.getItem("invoice")) {
        invoiceSnap = getInvoiceLocally();
      } else {
        invoiceSnap = await getInvoices(name);
        createLocalInvoice(invoiceSnap);
      }
    case "cred":
      return getCredLocally();
    case "userData":
      let userData;
      if (window.localStorage.getItem("userData")) {
        return JSON.parse(window.localStorage.getItem("userData"));
      } else {
        userData = await getFDB("UsersData");
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    default:
      return null;
  }
}

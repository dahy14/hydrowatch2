import { setInvoiceFDB } from "./getFirestoreDb";

import { generateSecureUID } from "./generateUID";

async function generateInvoice(billedTo, consumption, startDate, endDate) {
  const id = generateSecureUID();
  setInvoiceFDB(id, billedTo, consumption, startDate, endDate);
  console.log("invoice generated successfully");
  return id;
}
export default generateInvoice;

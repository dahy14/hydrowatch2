import { initApp } from "./initApp";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  Timestamp,
  serverTimestamp,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { getCurrentBill } from "./getCurrentBill";

const app = initApp();
const db = getFirestore(app);

export async function getFDB(coll) {
  const docSnap = await getDocs(collection(db, coll));
  let data = [];

  docSnap.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
}

export async function getOneFDB(coll, id) {
  const docRef = doc(db, coll, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function getInvoices(id) {
  const docRef = collection(db, "invoice");
  const q = await query(
    docRef,
    where("billedTo", "==", id),
    orderBy("endDate", "desc"),
    limit(12)
  );
  const docSnap = await getDocs(q);

  let data = [];

  docSnap.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
}

export async function getCurrentInvoice(id) {
  const docRef = collection(db, "invoice");
  const q = await query(
    docRef,
    where("billedTo", "==", id),
    orderBy("endDate", "desc"),
    limit(1)
  );
  const docSnap = await getDocs(q);

  let data = [];

  docSnap.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
}

// create function for creating...
export async function setInvoiceFDB(
  id,
  billedTo,
  consumption,
  startDate,
  endDate
) {
  // generate a unique refNumber
  // let idNum = id.match(/\d{0,19}/g);
  // idNum = idNum.toString().replace(/,{0,19}/g, "");
  // let refNumber = Math.floor(Math.random() * 1453.153 * idNum);
  // let refString = String(refNumber);
  // refNumber = refString.slice(0, 10);

  const bill = getCurrentBill(consumption);

  await setDoc(doc(db, "invoice", id), {
    bill: bill,
    billedTo: billedTo,
    consumption: consumption,
    startDate: Timestamp.fromDate(new Date(startDate)),
    endDate: Timestamp.fromDate(new Date(endDate)),
    refNumber: id,
    timestamp: serverTimestamp(),
  });
}

export async function setTenantFDB(name, deviceId, tenantId, email) {
  const a = await getFDB("tenants");
  const alength = a.length;
  let ccTenant = "tenant".concat(alength + 1).toLowerCase();
  if (tenantId) {
    ccTenant = tenantId.toLowerCase();
  }
  setDoc(doc(db, "tenants/", ccTenant), {
    name: name,
    deviceId: deviceId,
    email: email,
    timestamp: serverTimestamp(),
  });
}

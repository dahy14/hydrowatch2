import { getDatabase, onValue, ref, set } from "firebase/database";
import { initApp } from "./initApp";

const app = initApp();

const db = getDatabase();

export function setRDB(refPath, { data }) {
  const reference = ref(db, refPath);
  set(reference, data);
}

export function getRDB(refPath) {
  const aa = promisedData(refPath);
  return aa;
}

function promisedData(refPath) {
  const reference = ref(db, refPath);
  return new Promise((resolve, reject) => {
    onValue(reference, (ss) => {
      if (ss.exists()) {
        resolve(ss.val());
      } else {
        reject("No data available");
      }
    });
  });
}

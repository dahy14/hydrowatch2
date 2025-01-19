/** ensures only one firebase app exists */
import { initializeApp } from "firebase/app";

/** TEST FIREBASE CONFIG  */
// const firebaseConfig = {
//   apiKey: "AIzaSyCWZ0VcS-8Cjh0exCpIUuzx9czdUJPLefA",
//   authDomain: "coms-stateled.firebaseapp.com",
//   databaseURL:
//     "https://coms-stateled-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "coms-stateled",
//   storageBucket: "coms-stateled.appspot.com",
//   messagingSenderId: "1047473232631",
//   appId: "1:1047473232631:web:5d55ab96cd120b904851f2",
// };

/** ANOTHER TEST SERVER HY2C */

// const firebaseConfig = {
//   apiKey: "AIzaSyBPp9CrojsQ4N7xrRRKE8Y_hc514ijjBgE",
//   authDomain: "hy2c-f612d.firebaseapp.com",
//   databaseURL:
//     "https://hy2c-f612d-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "hy2c-f612d",
//   storageBucket: "hy2c-f612d.appspot.com",
//   messagingSenderId: "311709144721",
//   appId: "1:311709144721:web:889c2c19ad6899d5ea5130",
// };

/** PROD FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyAk7BXj1SDqUeLHW9BbYbnHZKI5Li02U9E",
  authDomain: "hydrowatch-39591.firebaseapp.com",
  databaseURL:
    "https://hydrowatch-39591-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hydrowatch-39591",
  storageBucket: "hydrowatch-39591.appspot.com",
  messagingSenderId: "1003929568577",
  appId: "1:1003929568577:web:77d17539ef3b6727c9cdc0",
};

let counter;

export function initApp() {
  counter = 0;
  if (counter === "1") {
    return new Error("App already initialized");
  }
  const app = initializeApp(firebaseConfig);
  counter++;
  return app;
}

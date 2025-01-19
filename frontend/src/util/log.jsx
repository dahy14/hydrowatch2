import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { initApp } from "./initApp";
import { getFDB } from "./getFirestoreDb";
import { createLocalTenant } from "./localDb";
const app = initApp();
const auth = getAuth(app);

export async function logIn(email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log("Error: ", error.message);
    return null;
  }
}

export async function logOut() {
  await signOut(auth);
  localStorage.removeItem("cred");
  localStorage.removeItem("tenant");
  localStorage.removeItem("invoice");
}

export async function checkAuth() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
        resolve(user);
      } else {
        console.log("User is signed out");
        resolve(null);
      }
    });
  });
}

export async function checkUser(cred) {
  const tenants = await getFDB("tenants");
  let status = null;
  let i = 0;

  while (status == null && i < tenants.length) {
    if ((tenants[i].email == cred.user.email) & tenants[i].adminStatus) {
      status = "admin";
    }

    if (
      (tenants[i].email == cred.user.email) &
      (tenants[i].adminStatus == undefined)
    ) {
      status = tenants[i].email;
      const tenant = {
        name: tenants[i].name,
        deviceId: tenants[i].deviceId,
        email: tenants[i].email,
      };
      createLocalTenant(tenant);
    }
    i++;
    console.log("status ", status);
  }
  return status;
}

export async function getTenantDataFromAuthToken(cred) {
  const tenants = await getFDB("tenants");
  let tenantData = null;
  let i = 0;

  while (tenantData == null && i < tenants.length) {
    if (tenants[i].email == cred.email) {
      tenantData = tenants[i];
    }
    i++;
  }
  return tenantData;
}

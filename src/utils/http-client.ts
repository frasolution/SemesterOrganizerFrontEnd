import axios from "axios";
import { getToken } from "./jwt";

const headersDefault = {
  "Content-Type": "application/json",
};

const headersWithAuth = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + getToken(),
};

export function getHeaders(isGuarded: boolean) {
  return isGuarded ? headersWithAuth : headersDefault;
}

export async function httpPost(url = "", data = {}, isGuarded = false) {
  return await axios.post(url, data, { headers: getHeaders(isGuarded) });
}

export async function httpGet(url = "", isGuarded = false) {
  return await axios.get(url, { headers: getHeaders(isGuarded) });
}

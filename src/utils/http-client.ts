import { getToken } from "./jwt";

const headersDefault = {
  "Content-Type": "application/json",
};

const headersWithAuth = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + getToken(),
};

function getHeaders(isGuarded: boolean) {
  return isGuarded ? headersWithAuth : headersDefault;
}

export async function httpPost(url = "", data = {}, isGuarded = false) {
  const response = await fetch(url, {
    method: "POST",
    headers: getHeaders(isGuarded),
    body: JSON.stringify(data),
  });

  return response;
}

export async function httpGet(url = "", isGuarded = false) {
  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(isGuarded),
  });

  return response;
}

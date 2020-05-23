const key = "accessToken";

export function getToken(): string | null {
  return localStorage.getItem(key);
}

export function setToken(token: string): void {
  localStorage.setItem(key, token);
}

export function deleteToken(): void {
  localStorage.removeItem(key);
}

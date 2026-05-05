export interface AuthSession {
  token: string;
  userId: string;
}

const AUTH_TOKEN_COOKIE = "tutor-academy.token";
const AUTH_USER_ID_COOKIE = "tutor-academy.userId";
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof window === "undefined") {
    return;
  }

  const cookieString = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Strict`;
  document.cookie = cookieString;
}

function getCookie(name: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

function deleteCookie(name: string): void {
  if (typeof window === "undefined") {
    return;
  }

  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Strict`;
}

export function readAuthSession(): AuthSession | null {
  const token = getCookie(AUTH_TOKEN_COOKIE);
  const userId = getCookie(AUTH_USER_ID_COOKIE);

  if (token && userId) {
    return { token, userId };
  }

  return null;
}

export function writeAuthSession(session: AuthSession | null): void {
  if (!session) {
    deleteCookie(AUTH_TOKEN_COOKIE);
    deleteCookie(AUTH_USER_ID_COOKIE);
    return;
  }

  setCookie(AUTH_TOKEN_COOKIE, session.token, COOKIE_MAX_AGE);
  setCookie(AUTH_USER_ID_COOKIE, session.userId, COOKIE_MAX_AGE);
}

export function getAuthToken(): string | null {
  return getCookie(AUTH_TOKEN_COOKIE);
}

import Cookies from "js-cookie";

export function useCurrentUser() {
  const userCookie = Cookies.get("user");

  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie);
  } catch (e) {
    console.error("Invalid user cookie format");
    return null;
  }
}

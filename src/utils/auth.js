export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  if (storedExpirationDate) {
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  }
  return null;
}
export function getAuthToken() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user) {
    const tokenDuration = getTokenDuration();
    if (!user.token) {
      return null;
    }

    if (tokenDuration < 0) {
      return "EXPIRED";
    }
    return user.token;
  }
  return null;
}

export function checkAuth() {
  const token = getAuthToken();
  if (token === "EXPIRED") {
    return "EXPIRED";
  }
  return null;
}

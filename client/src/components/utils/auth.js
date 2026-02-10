export const getUserData = () => {
  const data = localStorage.getItem("userData");
  return data ? JSON.parse(data) : null;
};

export const getUserId = () => {
  const user = getUserData();
  return user?.id || null;   // ✅ CORRECT
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("userToken");
};

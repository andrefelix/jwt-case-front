export const setLocalStorageAuth = (token: string) => {
  localStorage.setItem("auth", token);
};

export const getLocalStorageAuth = (): string | null => {
  return localStorage.getItem("auth");
};

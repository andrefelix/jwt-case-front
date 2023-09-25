import { getLocalStorageAuth } from "../utils/local-storage";

export const generateAuthorization = () => {
  const token = getLocalStorageAuth();

  return { Authorization: `Bearer ${token}` };
};

import { HttpStatusCode } from "axios";
import { clearLocalStorageAuth } from "./local-storage";

export const handleRejectError = (error: any) => {
  if (error.response?.status === HttpStatusCode.Unauthorized) {
    clearLocalStorageAuth();
    window.location.replace("/login");
  }
};

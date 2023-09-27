import React, { FC } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";

export const ToastSuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: 0,
    toastId: "my_toast",
  });
};

export const ToastError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: 0,
    toastId: "my_toast",
  });
};

const ToastComponent: FC = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};

export default ToastComponent;
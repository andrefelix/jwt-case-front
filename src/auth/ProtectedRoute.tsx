import React, { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isAllowed: boolean;
  redirectTo: string;
  children: ReactElement<any, any> | null;
};

const ProtectedRoute: FC<Props> = ({ isAllowed, redirectTo, children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return children;
};

export default ProtectedRoute;

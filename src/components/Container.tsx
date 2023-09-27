import React, { FC } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[] | null;
};

const Container: FC<Props> = ({ children }: Props) => {
  return (
    <div className="container">
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;

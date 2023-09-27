import React, { FC } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[] | null;
};

const CardBody: FC<Props> = ({ children }) => {
  return (
    <div className="col-md-12">
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default CardBody;

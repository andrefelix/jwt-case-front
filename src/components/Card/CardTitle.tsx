import React, { FC } from "react";

type Props = {
  title: string;
};

const CardTitle: FC<Props> = ({ title }) => {
  return (
    <h3 className="card-title text-center text-secondary mt-3">
      {title}
    </h3>
  );
};

export default CardTitle;

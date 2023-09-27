import React, { FC } from "react";

type MaxWidthEnum = "sm" | "md" | "lg";

const MaxWidthDict = {
  sm: '320px',
  md: '500px',
  lg: '720px',
};

type Props = {
  children: string | JSX.Element | JSX.Element[] | null;
  maxWidth: MaxWidthEnum;
};

const CardContainer: FC<Props> = ({ children, maxWidth }: Props) => {
  return (
    <div className="card mb-3 mt-3 rounded" style={{ maxWidth: MaxWidthDict[maxWidth] }}>
      {children}
    </div>
  );
};

export default CardContainer;

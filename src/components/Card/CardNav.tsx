import React, { FC } from "react";

type Props = {
  linkName: string;
  handleLink: () => void;
};

const CardNav: FC<Props> = ({ linkName, handleLink }) => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="btn btn-link"
          onClick={handleLink}
        >
          {linkName}
        </button>
      </div>
    </nav>
  );
};

export default CardNav;

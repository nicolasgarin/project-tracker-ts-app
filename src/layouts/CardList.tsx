import React from "react";

export const CardList = (props) => {
  const { children } = props;

  return (
    <>
      <div className="cardlist card-container d-flex">
          <div className="row">
              {children}
          </div>
      </div>
    </>
  )
}

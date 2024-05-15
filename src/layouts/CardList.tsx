import React from "react";

export default function CardList({children}) {
  return (
    <div className="cardlist card-container d-flex">
        <div className="row">
            {children}
        </div>
    </div>
  )
}

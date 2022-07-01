import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { ReactComponent as UKFlag } from "../utils/uk.svg";

function FlashCardList() {
  const { data, setData, dark } = useContext(DataContext);

  return (
    <div
      style={{ letterSpacing: "1.5px" }}
      className={`shadow-sm p-5 mb-5 mt-2 rounded 
      ${dark ? "bg-dark text-light" : "bg-light text-dark"}`}
    >
      <h2>Wszystkie fiszki:</h2>
      <ul>
        {data.map((item) => (
          <li
            className="fs-5"
            style={{ listStyle: "none" }}
            key={item.polish[0]}
          >
            <UKFlag style={{ height: "10px", marginRight: "10px" }} />
            {item.english} &rarr;{" "}
            {item.polish.map((arrayItem) => (
              <span
                className="fs-5 fst-italic text-muted"
                key={Math.floor(Math.random() * (1000 - 10) - 10)}
              >
                {arrayItem}
                <span>, </span>
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlashCardList;

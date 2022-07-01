import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

function FlashCardList() {
  const { data, setData, dark } = useContext(DataContext);

  return (
    <div
      className={`shadow-sm p-5 mb-5 mt-5 rounded 
      ${dark ? "bg-dark text-light" : "bg-light text-dark"}`}
    >
      <h2>Wszystkie fiszki:</h2>
      <ul>
        {data.map((item) => (
          <li key={item.polish[0]}>
            {item.english} {"->"}{" "}
            {item.polish.map((arrayItem) => (
              <span key={Math.floor(Math.random() * (1000 - 10) - 10)}>
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

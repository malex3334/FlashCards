import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";

function FlashCardList() {
  const { data, setData } = useContext(DataContext);

  return (
    <ul>
      {data.map((item) => (
        <li key={item.polish[0]}>
          {item.english} {"->"} {item.polish[0]}
        </li>
      ))}
    </ul>
  );
}

export default FlashCardList;

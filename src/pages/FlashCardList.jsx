import React, { useState } from "react";
import Data from "../data/data.json";

function FlashCardList() {
  const [data, setData] = useState(Data);
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

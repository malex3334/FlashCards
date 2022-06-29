import React, { useState } from "react";
import Data from "../data/data.json";

export default function FlashCardForm() {
  const [data, setData] = useState(Data);
  const [english, setEnglish] = useState("");
  const [polish, setPolish] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(english, polish);
    setData((prevState) => [...prevState, { polish: [polish], english }]);
    setEnglish("");
    setPolish("");
  };
  console.log(data);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Słówko:</span>
        <input
          type="text"
          onChange={(e) => setEnglish(e.target.value)}
          value={english}
        />
      </label>
      <label>
        <span>Tłumaczenie:</span>
        <input
          type="text"
          onChange={(e) => setPolish(e.target.value)}
          value={polish}
        />
      </label>
      <button className="btn btn-success">Dodaj</button>
    </form>
  );
}

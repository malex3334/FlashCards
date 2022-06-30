import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
// import Data from "../data/data.json";

export default function FlashCardForm({ setNewCard }) {
  const { data, setData } = useContext(DataContext);
  // const [data, setData] = useState(Data);
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
    <div className="modal-dialog modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Dodaj fiszkę:</h5>
        <button className="btn" onClick={(e) => setNewCard(false)}>
          &times;
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <label>
            <span>Słówko:</span>
            <input
              type="text"
              onChange={(e) => setEnglish(e.target.value.toLowerCase())}
              value={english}
            />
          </label>
          <label>
            <span>Tłumaczenie:</span>
            <input
              type="text"
              onChange={(e) => setPolish(e.target.value.toLowerCase())}
              value={polish}
            />
          </label>
          <button className="btn btn-success">Dodaj</button>
        </form>
      </div>
    </div>
  );
}

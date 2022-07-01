import React, { useContext, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
// import Data from "../data/data.json";

export default function FlashCardForm({ setNewCard }) {
  const inputRef = useRef();
  const { data, setData, dark } = useContext(DataContext);
  // const [data, setData] = useState(Data);
  const [english, setEnglish] = useState("");
  const [polish, setPolish] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(english, polish);
    setData((prevState) => [...prevState, { polish, english }]);
    console.log(data);
    setEnglish("");
    setPolish("");
    inputRef.current.focus();
  };

  return (
    <div
      className={`mx-auto modal-dialog modal-content ${
        dark ? "text-light bg-dark" : "text-dark bg-light"
      }`}
    >
      <div className="modal-header">
        <h5 className="modal-title">Dodaj fiszkę:</h5>
        <button
          className={`btn ${dark ? "text-light" : "text-dark"}`}
          onClick={(e) => setNewCard(false)}
        >
          &times;
        </button>
      </div>
      <div className="modal-body">
        <form className="form-group" onSubmit={handleSubmit}>
          <label>
            <span>Słówko:</span>
            <input
              className="form-control"
              required
              minLength={3}
              ref={inputRef}
              type="text"
              onChange={(e) => setEnglish(e.target.value.toLowerCase())}
              value={english}
            />
          </label>
          <label className="mb-3 ms-3">
            <span>Tłumaczenie:</span>
            <input
              className="form-control"
              required
              minLength={3}
              type="text"
              onChange={(e) =>
                setPolish(e.target.value.toLowerCase().split(/[ ,]+/))
              }
              value={polish}
            />
          </label>
          <button className="btn btn-success">Dodaj</button>
        </form>
      </div>
    </div>
  );
}

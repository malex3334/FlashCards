import React, { useContext, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Modal } from "react-bootstrap";
// import Data from "../data/data.json";

export default function FlashCardForm() {
  const inputRef = useRef();
  const { data, setData, dark, newCard, setNewCard } = useContext(DataContext);
  // const [data, setData] = useState(Data);
  const [english, setEnglish] = useState("");
  const [polish, setPolish] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setData((prevState) => [...prevState, { polish, english }]);
    setEnglish("");
    setPolish("");
    inputRef.current.focus();
  };

  return (
    <Modal show={newCard} onHide={() => setNewCard(false)}>
      <div
        className={`mx-auto modal-body  ${
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
            <button className="btn btn-success me-3">Dodaj</button>
            <button
              onClick={() => setNewCard(false)}
              className="btn btn-warning"
            >
              Zamknij
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}

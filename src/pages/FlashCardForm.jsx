import React, { useContext, useEffect, useId, useRef, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Modal } from "react-bootstrap";
// import Data from "../data/data.json";

export default function FlashCardForm() {
  const inputRef = useRef();
  const { data, setData, dark, newCard, setNewCard, lang } =
    useContext(DataContext);
  const [translate, setTranslate] = useState("");
  const [polish, setPolish] = useState("");
  const [category, setCategory] = useState("");
  const randomID = useId();
  const [flashAdded, setFlashAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData((prevState) => [
      ...prevState,
      { id: randomID, polish, translate, category: category },
    ]);
    setTranslate("");
    setPolish("");
    setCategory("");
    inputRef.current.focus();

    setFlashAdded(true);
    setTimeout(() => {
      setFlashAdded(false);
    }, 3000);
  };

  function FlashAdded() {
    return <h5 className="text-success text-align-center">Dodano fiszkę!</h5>;
  }

  useEffect(() => {
    if (lang === "ENGLISH") {
      localStorage.setItem("data", JSON.stringify(data));
    }
    if (lang === "SPANISH") {
      localStorage.setItem("dataES", JSON.stringify(data));
    }
  }, [handleSubmit]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
            {flashAdded && <FlashAdded />}
            <label>
              <span>Słówko:</span>
              <input
                className="form-control"
                required
                minLength={3}
                ref={inputRef}
                type="text"
                onChange={(e) => setTranslate(e.target.value.toLowerCase())}
                value={translate}
              />
            </label>
            <label className="mb-3 ms-sm-3">
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
            <label className="mb-3 ">
              <span>Kategoria:</span>
              <input
                className="form-control"
                required
                minLength={3}
                type="text"
                onChange={(e) => setCategory(e.target.value.toLowerCase())}
                value={category}
              />
            </label>
            <br />
            <button className="btn btn-success me-3 me-sm-3">Dodaj</button>
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

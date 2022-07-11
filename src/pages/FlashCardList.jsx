import React, { useContext, useEffect, useId, useState } from "react";
import { DataContext } from "../context/DataContext";
import { ReactComponent as UKFlag } from "../utils/uk.svg";
import { ReactComponent as PLFlag } from "../utils/pl.svg";
import Data from "../data/data.json";

function FlashCardList() {
  const { data, setData, dark, filteredData, setFilteredData } =
    useContext(DataContext);

  const handleDelete = (id) => {
    setData((prevData) =>
      prevData.filter((ex) => {
        return ex.id !== id;
      })
    );
  };

  const handleReset = (e) => {
    if (window.confirm("Na pewno zresetować bazę fiszek?")) {
      setData(Data);
    } else {
      return;
    }
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [handleDelete]);

  const handleCategory = (id) => {
    // reset filters
    let newData = [];

    if (id === "wszystkie") {
      setFilteredData(data);
    }

    data.filter((data) => {
      if (data.category === id) {
        newData.push(data);
        setFilteredData(newData);
      }
    });
  };

  return (
    <div
      style={{ letterSpacing: "1.5px" }}
      className={`shadow-sm p-5 mb-5 mt-2 rounded appear
      ${dark ? "bg-dark text-light" : "bg-light text-dark"}`}
    >
      <h2>Wszystkie fiszki:</h2>
      <ul>
        {filteredData ? (
          filteredData.map((item) => (
            <li
              className="fs-5"
              style={{ listStyle: "none" }}
              key={item.polish[0]}
            >
              <button
                onClick={() => {
                  handleDelete(item.id);
                }}
                className="btn btn-sm btn-danger me-2"
              >
                &times;
              </button>
              <UKFlag style={{ height: "10px", marginRight: "10px" }} />
              {item.english} &rarr;{" "}
              <span>
                <PLFlag className="me-2" style={{ height: "10px" }} />
              </span>
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
          ))
        ) : (
          <p>Brak fiszek do wyświetlenia</p>
        )}
      </ul>
      <div className="d-flex justify-content-center gap-3">
        <button
          onClick={() => handleCategory("szkoła")}
          className="btn btn-warning"
        >
          Szkoła
        </button>
        <button
          onClick={() => handleCategory("rozrywka")}
          className="btn btn-warning"
        >
          Rozrywka
        </button>
        <button
          onClick={() => handleCategory("wszystkie")}
          className="btn btn-warning"
        >
          Wszystkie
        </button>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button onClick={handleReset} className="btn btn-danger">
          Zresetuj wszystkie
        </button>
      </div>
    </div>
  );
}

export default FlashCardList;

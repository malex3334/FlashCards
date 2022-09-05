import React, { useContext, useEffect, useId, useState } from "react";
import { DataContext } from "../context/DataContext";
import { ReactComponent as UKFlag } from "../utils/uk.svg";
import { ReactComponent as PLFlag } from "../utils/pl.svg";
import { ReactComponent as ESPFlag } from "../utils/esp.svg";

import Data from "../data/data.json";
import DataES from "../data/dataES.json";
import { handleLang } from "../context/DataContext";

function FlashCardList() {
  const [categoryName, setCategoryName] = useState("Wszystkie");

  const { data, setData, dark, filteredData, setFilteredData, lang, setLang } =
    useContext(DataContext);

  const allCategories = [
    "wszystkie",
    ...new Set(data.map((item) => item.category)),
  ];

  const handleDelete = (id) => {
    setData((prevData) =>
      prevData.filter((ex) => {
        return ex.id !== id;
      })
    );
  };

  const handleReset = () => {
    if (window.confirm("Na pewno zresetować bazę fiszek?")) {
      if (lang === "ENGLISH") {
        localStorage.removeItem("data");
        // localStorage.setItem();
        setData(Data);
      }
      if (lang === "SPANISH") {
        localStorage.removeItem("dataES");
        setData(DataES);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    setData(handleLang(lang));
    setFilteredData(handleLang(lang));
  }, [lang]);

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
    setCategoryName(id);
  };

  return (
    <div
      style={{ letterSpacing: "1.5px" }}
      className={`shadow-sm p-5 mb-5 mt-2 rounded appear
      ${dark ? "bg-dark text-light" : "bg-light text-dark"}`}
    >
      <div className="d-flex justify-content-center gap-3">
        {allCategories.map((element) => {
          return (
            <button
              style={{ textTransform: "capitalize" }}
              key={element}
              onClick={() => handleCategory(element)}
              className="btn btn-warning"
            >
              {element}
            </button>
          );
        })}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button onClick={handleReset} className="btn btn-danger">
          Zresetuj wszystkie
        </button>
      </div>
      <div className="text-center  mt-3">
        <h2>Lista fiszek</h2>
        <p>kategoria: {categoryName.toUpperCase()}</p>
      </div>
      <ul>
        {filteredData.length > 0 ? (
          filteredData
            .sort((a, b) => a.translate.localeCompare(b.translate))
            .map((item) => (
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
                {lang === "ENGLISH" && (
                  <UKFlag style={{ height: "10px", marginRight: "10px" }} />
                )}
                {lang === "SPANISH" && (
                  <ESPFlag
                    style={{
                      height: "10px",
                      width: "15px",
                      marginRight: "10px",
                    }}
                  />
                )}
                {item.translate} &rarr;{" "}
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
          <>
            <p>Brak fiszek do wyświetlenia :(</p>
            <p className="text text-muted">
              Kliknij "dodaj fiszkę" aby dodać nowe słówka lub "zresetuj
              wszystkie" by przywrócić podstawowe fiszki.
            </p>
          </>
        )}
      </ul>
    </div>
  );
}

export default FlashCardList;

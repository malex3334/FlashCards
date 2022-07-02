import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { ReactComponent as UKFlag } from "../utils/uk.svg";

function FlashCardList() {
  const { data, setData, dark } = useContext(DataContext);

  const handleDelete = (id) => {
    console.log(id);
    setData((prevData) =>
      prevData.filter((ex) => {
        return ex.id !== id;
      })
    );
  };

  return (
    <div
      style={{ letterSpacing: "1.5px" }}
      className={`shadow-sm p-5 mb-5 mt-2 rounded 
      ${dark ? "bg-dark text-light" : "bg-light text-dark"}`}
    >
      <h2>Wszystkie fiszki:</h2>
      <ul>
        {data ? (
          data.map((item) => (
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
    </div>
  );
}

export default FlashCardList;

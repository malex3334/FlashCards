import React, { useRef, useState, useEffect } from "react";
import Data from "../data/data.json";

function FlashCard() {
  const answerInput = useRef();
  const [data, setData] = useState(Data);
  const [answer, setAnswer] = useState("");
  const [i, setI] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [dictionary, setDictionary] = useState("");
  const [hint, setHint] = useState(false);

  // get random flashcard index
  const randomIndex = (e) => {
    const newIndex = Math.floor(Math.random() * (data.length - 0));
    setI(newIndex);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();

    const isCorrect = () => {
      if (data[i].polish.includes(answer)) {
        setPoints((prev) => prev + 1);
        setStreak((prev) => prev + 1);
        console.log("świetnie!");

        if (data[i].polish.includes(answer) && hint) {
          console.log("hint active");
          setPoints((prev) => prev - 0.5);
          setStreak((prev) => prev + 1);
        }
      } else {
        console.log("źle!");
        setStreak(0);
      }
    };
    isCorrect();
    randomIndex();
    // clear input
    // focus on input
    answerInput.current.focus();
    // reset hint
    setHint(false);
    setAnswer("");
  };

  if (data[0].polish.includes("nisko")) {
    console.log(data[0].polish.includes(answer));
    console.log(answer);
  }

  // fetch dictionary data

  const fetchDescription = async (word) => {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const parsedRes = await res.json();
    setDictionary(parsedRes);
  };

  const handleHint = (e) => {};

  useEffect(() => {
    fetchDescription(data[i].english);
  }, [i]);

  // console.log(dictionary[0]?.meanings[0].definitions[0].definition);
  // console.log(dictionary);
  return (
    <div className="shadow-sm p-3 mb-5 mt-5 bg-white rounded">
      <h1>Fiszki PL/ENG</h1>
      <h4>Punkty: {points}</h4>
      <h5>Bez pomyłki: {streak}</h5>
      <div className="d-flex justify-content-center">
        <div className="mt-5 mb-5">
          <span style={{ fontSize: "30px" }}>{data[i].english}</span>

          <form onSubmit={handleAnswerSubmit}>
            <label></label>
            <input
              className="mt-3"
              minLength="3"
              required
              ref={answerInput}
              type="text"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
            />
            <button className="btn btn-success ms-2">Sprawdź!</button>
          </form>
        </div>
      </div>
      <div className="mt-5">
        <label className="container p-2 bg-info">
          Wykorzystanie podpowiedzi obniża punkt za tę odpowiedź do 0.5!
        </label>
        <br />
        <button
          className="mt-2 btn-sm btn-danger"
          onClick={() => setHint(true)}
        >
          Podpowiedź?
        </button>
        {hint && (
          <div className="container p-4">
            {dictionary[0]?.meanings[0].definitions[0].definition}
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashCard;

import React, { useRef, useState, useEffect } from "react";
import Data from "../data/data.json";
import CorrectSound from "../sounds/correct.mp3";
import WrongSound from "../sounds/wrong.mp3";

function FlashCard() {
  const answerInput = useRef();
  const [data, setData] = useState(Data);
  const [answer, setAnswer] = useState("");
  const [i, setI] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [dictionary, setDictionary] = useState("");
  const [hint, setHint] = useState(false);
  const [notification, setNotification] = useState("");

  // audio sound

  const correctSound = new Audio(CorrectSound);
  correctSound.volume = 0.2;
  const wrongSound = new Audio(WrongSound);

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
        correctSound.play();

        if (data[i].polish.includes(answer) && hint) {
          console.log("hint active");
          setPoints((prev) => prev - 0.5);
          setStreak((prev) => prev + 1);
          correctSound.play();
        }
      } else {
        console.log("źle!");
        setStreak(0);
        wrongSound.play();
      }
    };

    // check answer
    isCorrect();
    // get bew rabdin ubdex
    randomIndex();
    // focus on input
    answerInput.current.focus();
    // reset hint
    setHint(false);
    // clear input
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
    <div className="shadow-sm p-5 mb-5 mt-5 bg-white rounded">
      <h1 className="text-center text ">Fiszki PL/ENG</h1>
      <h4>Punkty: {points}</h4>
      <h5>Bez pomyłki: {streak}</h5>
      <div className="d-flex justify-content-center">
        <div className="shadow ps-5 pe-5 pb-4 mb-5 mt-5 bg-success rounded">
          <p className="text-center">{streak > 1 ? notification : null}</p>
          <p className="text-centered text-white" style={{ fontSize: "5rem" }}>
            {data[i].english}
          </p>
          <form onSubmit={handleAnswerSubmit}>
            <input
              className="mt-3"
              minLength="3"
              required
              ref={answerInput}
              type="text"
              onChange={(e) => setAnswer(e.target.value.toLowerCase())}
              value={answer}
            />
            <button className="btn btn-warning ms-2">Sprawdź!</button>
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

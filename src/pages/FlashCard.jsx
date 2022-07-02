import React, { useRef, useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";
import CorrectSound from "../sounds/correct.mp3";
import WrongSound from "../sounds/wrong.mp3";
import Hints from "../components/Hints";
import { ReactComponent as UKFlag } from "../utils/uk.svg";

//  wymyślić jak wywalić polskie znaki
// normalize("NFD").replace(/[\u0300-\u036f]/g, "")

function FlashCard() {
  const answerInput = useRef();
  const { data, setData, hint, setHint, dictionary, setDictionary } =
    useContext(DataContext);
  const [answer, setAnswer] = useState("");
  const [i, setI] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [notification, setNotification] = useState("");
  const { dark, setDark, handleToggleTheme } = useContext(DataContext);

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
      // todo - make it simpler...
      const normalizeIt = (item) => {
        return item.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };

      if (
        data[i].polish.includes(answer) ||
        data[i].polish.map((item) => normalizeIt(item)).includes(answer)
      ) {
        setPoints((prev) => prev + 1);
        setStreak((prev) => prev + 1);
        correctSound.play();

        if (
          (data[i].polish.includes(answer) && hint) ||
          !showAnswer ||
          (data[i].polish.map((item) => normalizeIt(item)).includes(answer) &&
            hint)
        ) {
          console.log("hint active");
          setPoints((prev) => prev - 0.5);
          setStreak((prev) => prev + 1);
          correctSound.play();
        }
        if (
          (data[i].polish.includes(answer) && showAnswer) ||
          (data[i].polish.map((item) => normalizeIt(item)).includes(answer) &&
            showAnswer)
        ) {
          console.log("showAnswer active");
          setPoints((prev) => prev - 1);
          setStreak((prev) => prev - 1);
          correctSound.play();
        }
      } else {
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
    setShowAnswer(false);
  };

  // fetch dictionary data

  const fetchDescription = async (word) => {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const parsedRes = await res.json();
    setDictionary(parsedRes);
  };

  useEffect(() => {
    fetchDescription(data[i].english);
  }, [i]);

  // polskie znaki

  return (
    <div
      className={`shadow-sm p-5 mb-5 mt-0 mt-md-5 rounded 
        ${dark ? "bg-dark" : "bg-light"}`}
    >
      <button
        onClick={handleToggleTheme}
        className="mb-2 btn btn-outline-primary w-20 "
      >
        {dark ? "Tryb dzienny" : "Tryb nocny"}
      </button>
      <h1
        className={`display-2 mb-3 mt-3 text-center  ${
          dark ? "text-light" : "text-dark"
        }`}
      >
        Fiszki <UKFlag style={{ width: "80px", height: "80px" }} />
      </h1>
      <div className={`${dark ? "text-light" : "text-dar"}`}>
        <h4>Punkty: {points}</h4>
        <h5>Bez pomyłki: {streak}</h5>
      </div>

      {/* ########## FLASHCARD BODY ######### */}
      <div className="d-flex justify-content-center">
        <div
          className={`shadow ps-5 pe-5 pb-4 mb-2 mt-1 rounded ${
            dark ? "border border-3 border-success" : "bg-success"
          }`}
        >
          <p className="text-center ">{streak > 1 ? notification : null}</p>
          <div className="d-flex align-items-center text-centered-text-white display-3">
            {!showAnswer && (
              <>
                <p className="text-centered text-white display-3">
                  {data[i].english}
                </p>
                <button
                  onClick={() => setShowAnswer(true)}
                  className="btn btn-sm btn-warning ms-4 "
                >
                  odp
                </button>
              </>
            )}
            {showAnswer && (
              <p className="text-centered text-muted display-3">
                {data[i].polish[0]}
              </p>
            )}
          </div>
          <form
            className="border-top border-3 border-light d-md-flex align-items-center"
            onSubmit={handleAnswerSubmit}
          >
            <input
              className="mt-3 mb-3 form-control form-control-sm"
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
      <Hints />
    </div>
  );
}

export default FlashCard;

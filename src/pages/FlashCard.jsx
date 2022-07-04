import React, { useRef, useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";
import CorrectSound from "../sounds/correct.mp3";
import WrongSound from "../sounds/wrong.mp3";
import Hints from "../components/Hints";
import { ReactComponent as UKFlag } from "../utils/uk.svg";
import { ReactComponent as PLFlag } from "../utils/pl.svg";
import { ReactComponent as MuteIcon } from "../utils/mute.svg";
import { ReactComponent as UnmuteIcon } from "../utils/unmute.svg";

// audio sound
const correctSound = new Audio(CorrectSound);
correctSound.volume = 0.2;
const wrongSound = new Audio(WrongSound);

function FlashCard() {
  const answerInput = useRef();
  const {
    data,
    setData,
    dark,
    setDark,
    hint,
    setHint,
    dictionary,
    setDictionary,
    mute,
    setMute,
    handleToggleTheme,
  } = useContext(DataContext);
  const [answer, setAnswer] = useState("");
  const [i, setI] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [failAnimation, setFailAnimation] = useState(false);
  const [bestStreak, setBestStreak] = useState(
    !localStorage.getItem("score") || localStorage.getItem("score") === []
      ? 0
      : JSON.parse(localStorage.getItem("score"))
  );
  // const [mute, setMute] = useState(false);

  const [notification, setNotification] = useState("");

  //success animation
  const handleSuccessAnimation = () => {
    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
    }, 1000);
  };

  const handleFailAnimation = () => {
    setFailAnimation(true);
    setTimeout(() => {
      setFailAnimation(false);
    }, 1000);
  };

  // get random flashcard index
  const randomIndex = (e) => {
    const newIndex = Math.floor(Math.random() * data.length);
    setI(newIndex);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();

    const isCorrect = () => {
      // todo - make it simpler...
      const normalizeIt = (item) => {
        return item
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\u0142/g, "l")
          .replace(/ /g, "");
      };

      // ANSWER CORRECT, HINTS AND ANSWER OFF
      if (
        (data[i].polish.includes(answer.replace(/ /g, "")) &&
          !showAnswer &&
          !hint) ||
        (data[i].polish
          .map((item) => normalizeIt(item))
          .includes(answer.replace(/ /g, "")) &&
          !showAnswer &&
          !hint)
      ) {
        setPoints((prev) => prev + 1);
        setStreak((prev) => prev + 1);
        handleSuccessAnimation();

        !mute && correctSound.play();

        // ANSWER CORRECT, ONLY HINT ON
      } else if (
        (data[i].polish.includes(answer.replace(/ /g, "")) &&
          showAnswer &&
          !hint) ||
        (data[i].polish
          .map((item) => normalizeIt(item))
          .includes(answer.replace(/ /g, "")) &&
          showAnswer &&
          !hint)
      ) {
        !mute && correctSound.play();
        handleSuccessAnimation();

        //  ANSWER CORRECT, ONLY ANSWER ON
      } else if (
        (data[i].polish.includes(answer.replace(/ /g, "")) &&
          !showAnswer &&
          hint) ||
        (data[i].polish
          .map((item) => normalizeIt(item))
          .includes(answer.replace(/ /g, "")) &&
          !showAnswer &&
          hint)
      ) {
        setPoints((prev) => prev + 0.5);
        setStreak((prev) => prev + 1);
        handleSuccessAnimation();
        !mute && correctSound.play();

        // ANSWER CORRECT, ANSWER AND HINT ON
      } else if (
        (data[i].polish.includes(answer.replace(/ /g, "")) &&
          showAnswer &&
          hint) ||
        (data[i].polish
          .map((item) => normalizeIt(item))
          .includes(answer.replace(/ /g, "")) &&
          showAnswer &&
          hint)
      ) {
        handleSuccessAnimation();
        !mute && correctSound.play();
      } else {
        setStreak(0);
        !mute && wrongSound.play();
        handleFailAnimation();
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

  const handleShowAnswer = () => {
    setShowAnswer(true);
    answerInput.current.focus();
  };

  useEffect(() => {
    fetchDescription(data && data[i]?.english);
  }, [i]);

  useEffect(() => {
    answerInput.current.focus();
  }, []);

  // najdłuższa seria
  useEffect(() => {
    if (streak > bestStreak) {
      setBestStreak(streak);
      localStorage.setItem("score", JSON.stringify(streak));
    }
  }, [streak, bestStreak]);

  useEffect(() => {}, [setBestStreak]);

  return (
    <div
      className={`shadow-sm p-5 mb-5 mt-0 mt-md-5 rounded 
        ${dark ? "bg-dark" : "bg-white"}`}
    >
      <button
        onClick={handleToggleTheme}
        className="me-2 btn btn-outline-primary w-20 "
      >
        {dark ? "Tryb dzienny" : "Tryb nocny"}
      </button>
      {mute && (
        <button onClick={() => setMute(false)} className="btn btn-sm">
          <MuteIcon style={dark ? { fill: "white" } : { fill: "#0275d8" }} />
        </button>
      )}
      {!mute && (
        <button onClick={() => setMute(true)} className="btn btn-sm">
          <UnmuteIcon style={dark ? { fill: "white" } : { fill: "#0275d8" }} />
        </button>
      )}
      <h1
        className={`display-2 mb-3 mt-3 text-center  ${
          dark ? "text-light" : "text-dark"
        }`}
      >
        Fiszki <UKFlag style={{ width: "80px", height: "80px" }} />
      </h1>
      <div
        className={`${
          dark ? "text-light" : "text-dar"
        } d-flex justify-content-around align-items-center mb-2 `}
      >
        <h5>Punkty: {points}</h5>
        <h5>Seria: {streak}</h5>
        <h5>Najdłuższa seria: {bestStreak}</h5>
      </div>

      {/* ########## FLASHCARD BODY ######### */}
      <div
        className={`d-flex justify-content-center 
        `}
      >
        <div
          className={` shadow ps-5 pe-5 pb-4 mb-2 mt-1 rounded ${
            dark ? "border border-3 border-success" : "bg-success"
          } ${successAnimation ? "correct" : ""} ${
            failAnimation ? "incorrect" : ""
          }`}
        >
          <p className="text-center ">{streak > 1 ? notification : null}</p>
          <div className="d-flex align-items-center text-centered-text-white display-3">
            {!showAnswer && (
              <>
                <p className="text-centered text-white display-3">
                  {data && data[i]?.english}
                </p>
                <button
                  onClick={handleShowAnswer}
                  className="btn btn-sm btn-warning ms-4 "
                >
                  odp
                </button>
              </>
            )}
            {showAnswer && (
              <p className="text-centered text-light display-3">
                {data && data[i]?.polish[0]}{" "}
                <PLFlag style={{ width: "40px" }} />
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

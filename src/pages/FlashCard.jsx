import React, { useRef, useState, useEffect, useContext } from "react";
import { DataContext, handleLang } from "../context/DataContext";
import { Modal } from "react-bootstrap";
import CorrectSound from "../sounds/correct.mp3";
import WrongSound from "../sounds/wrong.mp3";
import Hints from "../components/Hints";
import { ReactComponent as UKFlag } from "../utils/uk.svg";
import { ReactComponent as PLFlag } from "../utils/pl.svg";
import { ReactComponent as ESPFlag } from "../utils/esp.svg";
import { ReactComponent as MuteIcon } from "../utils/mute.svg";
import { ReactComponent as UnmuteIcon } from "../utils/unmute.svg";
import { ReactComponent as DarkMode } from "../utils/dm.svg";
import { ReactComponent as LightMode } from "../utils/lm.svg";

// audio sound
const correctSound = new Audio(CorrectSound);
correctSound.volume = 0.2;
const wrongSound = new Audio(WrongSound);

function FlashCard() {
  const answerInput = useRef();
  const {
    setData,
    dark,
    hint,
    setHint,
    setDictionary,
    mute,
    setMute,
    handleToggleTheme,
    filteredData,
    setFilteredData,
    lang,
    setLang,
    randomIndex,
    i,
    setI,
  } = useContext(DataContext);
  const [answer, setAnswer] = useState("");
  // const [i, setI] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [failAnimation, setFailAnimation] = useState(false);
  const [bestStreak, setBestStreak] = useState(
    !localStorage.getItem("score") || localStorage.getItem("score") === []
      ? 0
      : JSON.parse(localStorage.getItem("score"))
  );

  const [notification, setNotification] = useState("");
  let bodyImg = document.querySelector("body");
  const handleChangeLang = () => {
    if (lang === "ENGLISH") {
      setLang("SPANISH");
      setData(handleLang("SPANISH"));
      setFilteredData(handleLang("SPANISH"));
      bodyImg.classList.remove("eng-bg");
      bodyImg.classList.add("esp-bg");
    } else {
      setLang("ENGLISH");
      setData(handleLang("ENGLISH"));
      setFilteredData(handleLang("ENGLISH"));
      bodyImg.classList.remove("esp-bg");
      bodyImg.classList.add("eng-bg");
    }
  };

  const bgClass = () => {
    const ratio = 5;
    const streakPercent = streak * ratio;

    if (streakPercent < 100) {
      return `${streakPercent}%`;
    } else return "100%";
  };
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

  useEffect(() => {
    randomIndex();
  }, [setFilteredData, lang]);

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
        (filteredData[i].polish.includes(answer.replace(/ /g, "")) &&
          !showAnswer &&
          !hint) ||
        (filteredData[i].polish
          .map((item) => normalizeIt(item))
          .includes(answer.replace(/ /g, "")) &&
          !showAnswer &&
          !hint)
      ) {
        // learning system ?????
        filteredData.map((obj) => {
          if (obj.translate === filteredData[i].translate) {
            if (obj.complete) {
              obj.complete += 1;
            } else obj.complete = 1;
          }
        });
        setPoints((prev) => prev + 1);
        setStreak((prev) => prev + 1);
        handleSuccessAnimation();
        !mute && correctSound.play();
        randomIndex();
        // ANSWER CORRECT, ONLY HINT ON
      } else if (
        (filteredData[i].polish.includes(answer.replace(/ /g, "")) &&
          showAnswer &&
          !hint) ||
        (filteredData[i].polish
          .map((item) => normalizeIt(item))
          .includes(answer.replace(/ /g, "")) &&
          showAnswer &&
          !hint)
      ) {
        !mute && correctSound.play();
        handleSuccessAnimation();
        randomIndex();
        //  ANSWER CORRECT, ONLY ANSWER ON
      } else if (
        (filteredData[i].polish.includes(answer.replace(/ /g, "")) &&
          !showAnswer &&
          hint) ||
        (filteredData[i].polish
          .map((item) => normalizeIt(item))
          .includes(answer.replace(/ /g, "")) &&
          !showAnswer &&
          hint)
      ) {
        setPoints((prev) => prev + 0.5);
        setStreak((prev) => prev + 1);
        handleSuccessAnimation();
        !mute && correctSound.play();
        randomIndex();
        // ANSWER CORRECT, ANSWER AND HINT ON
      } else if (
        (filteredData[i].polish.includes(answer.replace(/ /g, "")) &&
          showAnswer &&
          hint) ||
        (filteredData[i].polish
          .map((item) => normalizeIt(item))
          .includes(answer.replace(/ /g, "")) &&
          showAnswer &&
          hint)
      ) {
        handleSuccessAnimation();
        !mute && correctSound.play();
        randomIndex();
      } else {
        // show correct answer

        setShowCorrectAnswer(true);
        setTimeout(() => {
          setShowCorrectAnswer(false);
          randomIndex();
        }, 1000);

        setStreak(0);
        !mute && wrongSound.play();
        handleFailAnimation();
      }
    };

    // check answer
    isCorrect();
    // focus on input
    answerInput.current.focus();
    // reset hint
    setHint(false);
    // clear input
    setAnswer("");
    setShowAnswer(false);
  };

  function handleSkipAnswer() {
    setShowCorrectAnswer(true);
    setTimeout(() => {
      randomIndex();
      setShowCorrectAnswer(false);
    }, 1000);
    setShowAnswer(false);
    setStreak(0);
    setHint(false);

    !mute && wrongSound.play();
    handleFailAnimation();
  }

  const handleShowAnswer = () => {
    setShowAnswer(true);
    answerInput.current.focus();
  };

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

  return (
    <div
      className={` shadow p-3 mt-0 mt-md-5 rounded
        ${dark ? "bg-dark" : "bg-light"}`}
    >
      <div className="d-flex align-items-center justify-content-around">
        <button
          onClick={handleToggleTheme}
          style={{ width: "15%" }}
          className="btn btn-sm "
        >
          {dark ? (
            <LightMode style={{ fill: "white", transform: "scale(1.3)" }} />
          ) : (
            <DarkMode style={{ fill: "#0275d8", transform: "scale(1.3)" }} />
          )}
        </button>

        <div
          onClick={handleChangeLang}
          className={`display-2 mb-3 mt-3 text-center d-flex align-items-center justify-content-around gap-3 ${
            dark ? "text-light" : "text-dark"
          }`}
        >
          <h1 style={{ margin: "0" }}>Fiszki</h1>
          {lang === "ENGLISH" ? (
            <UKFlag
              style={{ width: "80px", height: "80px", cursor: "pointer" }}
            />
          ) : (
            <ESPFlag
              style={{ width: "80px", height: "60px", cursor: "pointer" }}
            />
          )}
        </div>

        {mute && (
          <button
            onClick={() => setMute(false)}
            style={{ width: "15%" }}
            className="btn btn-sm"
          >
            <MuteIcon
              style={
                dark
                  ? { fill: "white", transform: "scale(1.3)" }
                  : { fill: "#0275d8", transform: "scale(1.3)" }
              }
            />
          </button>
        )}
        {!mute && (
          <button
            onClick={() => setMute(true)}
            style={{ width: "15%" }}
            className="btn btn-sm"
          >
            <UnmuteIcon
              style={
                dark
                  ? { fill: "white", transform: "scale(1.5)" }
                  : { fill: "#0275d8", transform: "scale(1.5)" }
              }
            />
          </button>
        )}
      </div>
      <p
        className={`fw-bold
      ${dark ? "text-info" : "text-dark"}
       text-center`}
        style={{ letterSpacing: "2px" }}
      >
        Kliknij flagę by zmienić język fiszek
      </p>
      <div
        className={`${
          dark ? "text-light" : "text-dark"
        } d-flex justify-content-around align-items-center m-4 border border-warning rounded-3  `}
      >
        <p className="points">Punkty: {points}</p>
        <p className="points">Seria: {streak}</p>
        <p className="points">Najdłuższa seria: {bestStreak}</p>
      </div>

      {/* ########## FLASHCARD BODY ######### */}
      <div
        // style={{ position: "relative" }}
        className={` d-flex justify-content-center 
        `}
      >
        <div
          className={`flashcard shadow ps-5 pe-5 pb-4 mb-2 mt-1 rounded d-flex flex-column align-items-center ${
            dark ? "border border-3 border-success" : "bg-secondary"
          } ${successAnimation ? "correct" : ""} ${
            failAnimation ? "incorrect" : ""
          }`}
        >
          <div style={{ height: bgClass() }} className="flashcard-bg"></div>
          <p className="text-center ">{streak > 1 ? notification : null}</p>
          <div className="d-flex align-items-center text-centered-text-white display-3">
            {!showAnswer && (
              <>
                <div className="text-centered text-white display-3">
                  {filteredData.length > 0 ? (
                    <p>
                      {filteredData[i]?.translate}
                      <span className="points">
                        {" "}
                        (
                        {filteredData[i]?.complete
                          ? filteredData[i].complete
                          : "0"}
                        )
                      </span>
                    </p>
                  ) : (
                    <span
                      className={`display-5 ${
                        dark ? "text-muted" : "text-light"
                      }`}
                    >
                      brak fiszki
                    </span>
                  )}
                </div>
                <div className="button-container d-flex flex-column gap-1">
                  <button
                    onClick={handleShowAnswer}
                    className="btn btn-sm btn-warning ms-4 mb-1 "
                  >
                    odp?
                  </button>
                </div>
              </>
            )}
            {showAnswer && (
              <p className="text-centered text-light display-3">
                {filteredData && filteredData[i]?.polish[0]}{" "}
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
            <button className="btn btn-danger ms-2" onClick={handleSkipAnswer}>
              pomiń
            </button>
            {/* <button className="btn btn-warning ms-2">Sprawdź!</button> */}
          </form>
        </div>
      </div>
      <Modal
        style={{ transition: "all 0s" }}
        show={showCorrectAnswer}
        onHide={() => setShowCorrectAnswer(false)}
      >
        <div
          className={`container p-3 d-flex flex-column justify-content-center align-items-start p-3 border border-3 border-success ${
            dark ? "text-white bg-dark  " : "bg-success text-white"
          }`}
        >
          <h5>Poprawna odpowiedź:</h5>
          <p
            style={{ textAlign: "center" }}
            className="text-centered display-3"
          >
            {filteredData && filteredData[i]?.polish[0]}{" "}
            <PLFlag style={{ width: "40px" }} />
          </p>
        </div>
      </Modal>
      <Hints i={i} />
    </div>
  );
}

export default FlashCard;

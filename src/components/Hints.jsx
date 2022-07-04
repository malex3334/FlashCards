import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Modal } from "react-bootstrap";

const Hints = () => {
  const { dark, hint, setHint, dictionary } = useContext(DataContext);
  const [infoOpen, setInfoOpen] = useState(false);

  const audio = new Audio(
    !dictionary[0]?.phonetics[0]?.audio
      ? dictionary[0]?.phonetics[1]?.audio
      : dictionary[0]?.phonetics[0]?.audio
  );

  return (
    <div className={`mt-5 ${dark ? "text-light" : "text-dark"} `}>
      <div className="d-flex justify-content-center align-items-center ">
        <button onClick={() => setInfoOpen(true)} className="btn btn-info me-3">
          Zasady
        </button>

        <button
          className="mt-2 mb-2 btn btn-danger"
          onClick={() => setHint(true)}
        >
          Podpowiedź?
        </button>
      </div>
      <Modal
        show={infoOpen}
        onHide={() => setInfoOpen(false)}
        className="rounded"
      >
        <label
          className={`container p-2 d-flex justify-content-between  align-items-start p-3 ${
            dark ? "text-white bg-dark " : "bg-light text-dark"
          }`}
        >
          <ul>
            <h5 className="text-info">Zasady punktacji:</h5>
            <li>Poprawna odpowiedź = 1 pkt.</li>
            <li>Poprawna odpowiedź z podpowiedzią = 0.5 pkt.</li>
            <li>Sprawdzenie odpowiedzi = 0 pkt.</li>
          </ul>
          <button
            onClick={() => setInfoOpen(false)}
            className="btn btn-sm btn-danger"
          >
            &times;
          </button>
        </label>
      </Modal>

      {hint && (
        <div className="container p-3 appear">
          <div className="d-flex">
            <h2>{dictionary[0]?.word}</h2>

            <button onClick={() => audio.play()} className="btn btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill={dark ? "white" : "black"}
                className="bi bi-play"
                viewBox="0 0 16 16"
              >
                <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
              </svg>
            </button>
          </div>

          <p>
            <span className="text-muted font-italic">
              {dictionary[0]?.meanings[0]?.partOfSpeech}:{" "}
            </span>

            {dictionary[0]?.meanings[0]?.definitions[0]?.definition}
          </p>
          <p>
            <span className="text-muted font-italic">
              {dictionary[0]?.meanings[1]?.partOfSpeech}:{" "}
            </span>

            {dictionary[0]?.meanings[1]?.definitions[1]?.definition}
          </p>
          <p>
            <span className="text-muted font-italic">
              {dictionary[0]?.meanings[2]?.partOfSpeech}:{" "}
            </span>

            {dictionary[0]?.meanings[2]?.definitions[2]?.definition}
          </p>
          <p>
            <span className="text-muted font-italic">
              {dictionary[0]?.meanings[3]?.partOfSpeech}:{" "}
            </span>

            {dictionary[0]?.meanings[3]?.definitions[3]?.definition}
          </p>
        </div>
      )}
    </div>
  );
};

export default Hints;

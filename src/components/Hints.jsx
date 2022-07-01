import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Hints = () => {
  const { dark, hint, setHint, dictionary } = useContext(DataContext);

  return (
    <div className={`mt-5 ${dark ? "text-light" : "text-dark"}`}>
      <div className="d-flex justify-content-center">
        <button
          className="mt-2 mb-2 btn btn-danger"
          onClick={() => setHint(true)}
        >
          Podpowiedź?
        </button>
      </div>
      <label
        className={`container p-2 ${
          dark ? "border border-1 border-info " : "bg-info"
        }`}
      >
        Wykorzystanie podpowiedzi obniża punkt za tę odpowiedź do 0.5!
      </label>
      {hint && (
        <div className="container p-4">
          {dictionary[0]?.meanings[0].definitions[0].definition}
        </div>
      )}
    </div>
  );
};

export default Hints;

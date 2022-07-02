import { useContext, useState } from "react";
import { DataContext } from "./context/DataContext";

import FlashCard from "./pages/FlashCard";
import FlashCardForm from "./pages/FlashCardForm";
import FlashCardList from "./pages/FlashCardList";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { newCard, setNewCard } = useContext(DataContext);

  return (
    <div className="container p-0 p-sm-3">
      <FlashCard />

      <div className="d-flex justify-content-center mb-5">
        <button
          className="me-3 btn btn-warning"
          onClick={() => {
            setIsOpen(!isOpen);
            setNewCard(false);
          }}
        >
          Lista fiszek
        </button>
        <button
          className="btn btn-warning"
          onClick={() => {
            setNewCard(!newCard);
            setIsOpen(false);
          }}
        >
          Dodaj fiszkę
        </button>
      </div>

      {isOpen && <FlashCardList />}

      {newCard && <FlashCardForm />}
    </div>
  );
}

export default App;

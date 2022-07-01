import { useState } from "react";
import FlashCard from "./pages/FlashCard";
import FlashCardForm from "./pages/FlashCardForm";
import FlashCardList from "./pages/FlashCardList";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [newCard, setNewCard] = useState(false);

  return (
    <div className="container-sm p-0 p-sm-3">
      <FlashCard />
      <div className="d-flex justify-content-center">
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
      {newCard && <FlashCardForm setNewCard={setNewCard} />}
    </div>
  );
}

export default App;

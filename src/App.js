import { useState } from "react";
import FlashCard from "./pages/FlashCard";
import FlashCardForm from "./pages/FlashCardForm";
import FlashCardList from "./pages/FlashCardList";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [newCard, setNewCard] = useState(false);

  return (
    <div className="container">
      <FlashCard />
      <div className="d-flex justify-content-center">
        <button onClick={() => setIsOpen(!isOpen)}>Lista fiszek</button>
        <button onClick={() => setNewCard(!newCard)}>Dodaj fiszkę</button>
      </div>
      {isOpen && <FlashCardList />}
      {newCard && <FlashCardForm setNewCard={setNewCard} />}
    </div>
  );
}

export default App;

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
      <button onClick={() => setIsOpen(!isOpen)}>Lista fiszek</button>
      {isOpen && <FlashCardList />}
      <button onClick={() => setNewCard(!newCard)}>Dodaj fiszkę</button>
      {newCard && <FlashCardForm />}
    </div>
  );
}

export default App;

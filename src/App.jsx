import { useState, useEffect } from "react";
import "./App.css";
import initialCards from "./data/initialCard";
import Board from "./components/Board";
import GameInfo from "./components/GameInfo";

function App() {
  const shuffleCards = (cards) => {
    return [...cards].sort(() => Math.random() - 0.5); 
  };

  const [cards, setCards] = useState(() => shuffleCards(initialCards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsDisabled(true);
      const [first, second] = flippedCards;

      if (cards[first].image === cards[second].image) {
        setMatchedCards((prev) => [...prev, first, second]);
        setFlippedCards([]);
        setIsDisabled(false);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) =>
              index === first || index === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsDisabled(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index) => {
    if (isDisabled || flippedCards.includes(index) || matchedCards.includes(index)) return;

    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards((prev) => [...prev, index]);
  };

  const resetGame = () => {
    setCards(shuffleCards(initialCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setIsDisabled(false);
  };

  return (
    <div className="app">
      <h1 className="title">Memory Game</h1>
      <Board cards={cards} onCardClick={handleCardClick} />
      <GameInfo matchedCards={matchedCards} onReset={resetGame} />
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
//Images of cards
const cardImages = [
  {"src": "/img/BlueSmiley.png", matched: false},
  {"src": "/img/GreenSmiley.png", matched: false},
  {"src": "/img/OrangeSmiley.png", matched: false},
  {"src": "/img/PinkSmiley.png", matched: false},
  {"src": "/img/WhiteSmiley.png", matched: false},
  {"src": "/img/YellowSmiley.png", matched: false}
];


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  var inputsDisabled = false;
  
  // shuffle cards 
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ... cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}));
  
    setCards(shuffleCards);
    setTurns(0);
    resetChoices();
  }

  const handleChoice = (card) => {
    if (card.matched || inputsDisabled) { //ignore already matched cards
      return;
    }
    if (choiceOne == null) {
      setChoiceOne(card);
      return;
    }
    if (choiceOne.id == card.id) { //ignore if it is already the selected card
      return;
    }
    setChoiceTwo(card);
  }


  const onTurnOver = () => {
      
      if (choiceOne.src === choiceTwo.src) {
        //Flag cards as already matched
        setCards(prevCards => {
            return prevCards.map(card => {
              return card.src == choiceOne.src ? {...card, matched: true} : card           
            });
        })  
        resetTurn();
        return;
      } 
      inputsDisabled = true;
      setTimeout(() => {
        if (!(choiceOne && choiceTwo)) {
            return;
        }
        resetTurn()
      }, 1000)
  }
  


  useEffect(() => {
    if (choiceOne && choiceTwo) {
      onTurnOver();
    }
  }, [choiceOne, choiceTwo])

  const resetChoices = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
  }
  //Resetting turn
  const resetTurn = () => {
      resetChoices();
      setTurns(prevTurns => prevTurns + 1)
      inputsDisabled = false;
  }
  //Only runs at start
  useEffect(shuffleCards, []);

  return (
    <div className="App">
      <h1>Match stuff</h1>  
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
            <SingleCard 
            card={card}
            handleChoice={handleChoice}
            flipped={card.matched || card === choiceOne || card == choiceTwo}
            />  
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;

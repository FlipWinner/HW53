import './App.css';
import CardDeck from './lib/CardDeck.ts';
import { useState } from 'react';
import  Card from './lib/Card.ts';
import PokerHand from './lib/PokerHand.ts';
import CardItem from './components/CardItem/CardItem.tsx';

const cardDeck = new CardDeck();
let cardDeckLength = cardDeck.deck.length;

const App = () => {
	const [hand, setHand] = useState<Card[]>([]);
	const [combination, setCombination] = useState<string>('');
	const [checkedCards, setCheckedCards] = useState<string[]>([]);
    
	const getFiveCards = () => {
		const fiveCards = cardDeck.getCards();
		setHand(fiveCards);
		setCheckedCards([]);
		cardDeckLength = cardDeckLength - 5;
        
		const pokerHand = new PokerHand(fiveCards);
		setCombination(pokerHand.getOutcome());
	};
    
	const getNewCardDeck = () => {
		cardDeck.cardGenerate();
		setHand([]);
		setCheckedCards([]);
		setCombination('');
		cardDeckLength = 52;
	};
    
	const handleCardChange = (rank: string | number, suit: string) => {

		if (cardDeckLength > 0) {
			const cardKey = `${rank}${suit}`;
			setCheckedCards(prevState => {
				if (prevState.includes(cardKey)) {
					cardDeckLength += 0.5;
					return prevState.filter(key => key !== cardKey);
				} else {
					cardDeckLength -= 0.5;
					return [...prevState, cardKey];
				}
			});

		}
		console.log(cardDeck.deck.length);
		console.log(cardDeckLength);
	};

	const changeCards = () => {     
		if (cardDeckLength > 0) {
			const replacementCards: Card[] = checkedCards.map(() => cardDeck.getCard());
			let handCopy = [...hand];
			let replacementIndex = -1;
            
			checkedCards.forEach((card) => {
				handCopy = handCopy.map((cardItem) => {
					if (cardItem.rank + cardItem.suit === card ) {
						replacementIndex++;
						return replacementCards[replacementIndex];
					} else {
						return cardItem;
					}
				});
			});
			setHand(handCopy);
			setCheckedCards([]);
			
    
			const pokerHand = new PokerHand(handCopy);
			setCombination(pokerHand.getOutcome());
		}
	};
    
	return (
		<>
			<h5>Кол-во оставшихся карт: {cardDeck.deck.length}</h5>
			<h5>Комбинация: {combination}</h5>

			{cardDeck.deck.length >= 5
				? <button type='button' onClick={getFiveCards}>Взять 5 карт</button>
				: <button type='button' onClick={getNewCardDeck}>Сгенерировать новую колоду</button>
			}
			{checkedCards.length > 0 
                && <button className='change-button' onClick={changeCards}>Поменять карты</button>
			}
            
			<div className="playingCards faceImages">
				{hand.map((card) => (
					<CardItem
						key={card.suit + card.rank}
						rank={card.rank}
						suit={card.suit}
						functionOnClick={handleCardChange}
					/>
				))}
			</div>
		</>
	);
};

export default App;

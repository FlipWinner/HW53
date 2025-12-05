import './App.css';
import CardDeck from './lib/CardDeck.ts';
import { useState } from 'react';
import type Card from './lib/Card.ts';
import PokerHand from './lib/PokerHand.ts';
import CardItem from './components/CardItem/CardItem.tsx';

const cardDeck = new CardDeck();

const App = () => {
	const [hand, setHand] = useState<Card[]>([]);
	const [combination, setCombination] = useState<string>('');
    
	const getFiveCards = () => {
		const fiveCards = cardDeck.getCards();
		setHand(fiveCards);
        
		const pokerHand = new PokerHand(fiveCards);
		setCombination(pokerHand.getOutcome());
	};
    
	const changeCard = (key: number) => {
		const card = cardDeck.getCard();
		let cards = [...hand];
		cards = cards.splice(key, 1);
		cards.push(card);
		setHand(cards);
        
		const pokerHand = new PokerHand(cards);
		setCombination(pokerHand.getOutcome());
	};
    
	const getNewCardDeck = () => {
		cardDeck.cardGenerate();
		setHand([]);
		setCombination('');
	};
    
	return (
		<>
			<h5>Кол-во оставшихся карт: {cardDeck.deck.length}</h5>
			<h5>Комбинация: {combination}</h5>

			{cardDeck.deck.length >= 5
				? <button type='button' onClick={getFiveCards}>Взять 5 карт</button>
				: <button type='button' onClick={getNewCardDeck}>Сгенерировать новую колоду</button>
			}
            
			<div className="playingCards faceImages">
				{hand.map((card) => (
					<CardItem
						key={card.suit + card.rank}
						rank={card.rank}
						suit={card.suit}
					/>
				))}
			</div>
		</>
	);
};

export default App;

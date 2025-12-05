import Card from './Card.ts';


class CardDeck {
	public deck: Card[] = [];
	suits = ['diams', 'hearts', 'clubs', 'spades'];
	ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
	constructor()  {
		this.cardGenerate();
	}
    
	cardGenerate = () => {
		this.deck = [];
        
		this.suits.forEach((suit) => {
			this.ranks.forEach((rank) => {
				this.deck.push(new Card(rank, suit));
			});
		});
	};

	getCard= () => {
		const randomNumber = Math.floor(Math.random() * this.deck.length);
		const randomCard = this.deck[randomNumber];
		this.deck.splice(randomNumber, 1);
		return randomCard;
	};

	getCards = (howMany: number = 5) => {
		const cards: Card[] = [];

		for (let i = 0; i < howMany; i++) {
			cards.push(this.getCard());
		}
		return cards;
	};
}

export default CardDeck;
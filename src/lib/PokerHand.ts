import type Card from './Card.ts';

class PokerHand {
	public hand: Card[];

	constructor (hand: Card[]) {
		this.hand = hand;
	}

	getOutcome = () => {
		const suit: { [key: string]: number } = {
			diams: 0,
			hearts: 0,
			clubs: 0,
			spades: 0
		};
		const rank: { [key: string]: number } = {
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
			7: 0,
			8: 0,
			9: 0,
			10: 0,
			J: 0,
			Q: 0,
			K: 0,
			A: 0
		};

		this.hand.forEach(hand => {
			suit[hand.suit]++;
			rank[hand.rank]++;
			console.log(hand);
		});

		const suitValues = Object.values(suit);
		const rankValues = Object.values(rank);
        
		const fleshCheck = suitValues.filter(suit => suit === 5);
		if (fleshCheck.length > 0) return 'Флеш';
        
		const pairThreeCheck = rankValues.filter(rank => rank === 3);
		if (pairThreeCheck.length > 0) return 'Тройка';
        
		const pairCheck = rankValues.filter(rank => rank === 2);
		if (pairCheck.length === 2) return 'Две пары';
		if (pairCheck.length === 1) return 'Одна пара';
		else return 'Старшая карта';
	};
}

export default PokerHand;
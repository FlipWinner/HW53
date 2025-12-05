import React from 'react';

interface Props {
    rank: string | number;
    suit: string;
}

const CardItem: React.FC<Props> = ({ rank, suit }) => {
	const suitsObject: {[key: string]: string} = {
		'diams': '♦',
		'hearts': '♥',
		'clubs': '♣',
		'spades': '♠'
	};

	return (
		<span className={`card rank-${String(rank).toLowerCase()} ${suit}`}>
			<span className='rank'>{rank}</span>
			<span className='suit'>{suitsObject[suit]}</span>
		</span>
	);
};

export default CardItem;
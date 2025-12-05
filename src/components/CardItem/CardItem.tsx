import React from 'react';

interface Props {
    rank: string | number;
    suit: string;
    functionOnClick: (rank: string | number, suit: string) => void;
}

const CardItem: React.FC<Props> = ({ rank, suit, functionOnClick }) => {
	const suitsObject: {[key: string]: string} = {
		'diams': '♦',
		'hearts': '♥',
		'clubs': '♣',
		'spades': '♠'
	};

	return (
		<>
			<div className="card-container">
				<div className="card-item">
					<span className={`card rank-${String(rank).toLowerCase()} ${suit}`}>
						<span className='rank'>{rank}</span>
						<span className='suit'>{suitsObject[suit]}</span>
					</span>
					<button onClick={() => functionOnClick(rank, suit)}></button>
				</div>
			</div>
		</>
	);
};

export default CardItem;
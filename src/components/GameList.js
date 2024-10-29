import React from 'react';
import GameCard from './GameCard';

const GameList = ({ games, onGameSelect }) => {
    return (
        <div className="games-container">
            {games.map(game => (
                <GameCard key={game.id} game={game} onClick={() => onGameSelect(game)} />
            ))}
        </div>
    );
};

export default GameList;

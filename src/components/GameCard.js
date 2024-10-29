import React from 'react';

const GameCard = ({ game, onClick }) => {
    // Vérification pour s'assurer que 'game' est défini
    if (!game) {
        return <div className="game-card">No game data available</div>;
    }

    return (
        <div className="game-card" onClick={onClick}>
            <img src={game.background_image || 'default_image_url.jpg'} alt={game.name || 'Unnamed Game'} />
            <h2>{game.name || 'Unnamed Game'}</h2>

            {/* Vérification de platforms */}
            <p>
                Platforms: {Array.isArray(game.platforms) && game.platforms.length > 0 
                    ? game.platforms.map(p => p.platform.name).join(', ') 
                    : 'No platforms available'}
            </p>

            <div className="overlay">
                <p>Release Date: {game.released || 'Unknown'}</p>

                {/* Vérification de publishers */}
                <p>
                    Publisher: {Array.isArray(game.publishers) && game.publishers.length > 0 
                        ? game.publishers.map(p => p.name).join(', ') 
                        : 'No publisher available'}
                </p>

                {/* Vérification de genres */}
                <p>
                    Genres: {Array.isArray(game.genres) && game.genres.length > 0 
                        ? game.genres.map(g => g.name).join(', ') 
                        : 'No genres available'}
                </p>

                <p>
                    Rating: {game.rating ? `${game.rating} (${game.ratings_count} votes)` : 'No rating available'}
                </p>
            </div>
        </div>
    );
};

export default GameCard;

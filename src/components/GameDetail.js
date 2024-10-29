import React from 'react';

const GameDetail = ({ game }) => {
    // Vérifiez si l'objet game est défini
    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-detail">
            <h1>{game.name || 'Unnamed Game'}</h1>
            <img 
                src={game.background_image || 'default_image_url.jpg'} 
                alt={game.name || 'Unnamed Game'} 
            />
            <p>{game.description_raw || 'No description available.'}</p>
            <p>Release Date: {game.released || 'Unknown'}</p>

            {/* Vérification des développeurs */}
            <p>
                Developer(s): {Array.isArray(game.developers) && game.developers.length > 0 
                    ? game.developers.map(dev => dev.name).join(', ') 
                    : 'No developers available'}
            </p>

            {/* Vérification des éditeurs */}
            <p>
                Publisher: {Array.isArray(game.publishers) && game.publishers.length > 0 
                    ? game.publishers.map(pub => pub.name).join(', ') 
                    : 'No publisher available'}
            </p>

            {/* Vérification des genres */}
            <p>
                Genres: {Array.isArray(game.genres) && game.genres.length > 0 
                    ? game.genres.map(g => g.name).join(', ') 
                    : 'No genres available'}
            </p>

            {/* Vérification des plateformes */}
            <p>
                Platforms: {Array.isArray(game.platforms) && game.platforms.length > 0 
                    ? game.platforms.map(p => p.platform.name).join(', ') 
                    : 'No platforms available'}
            </p>

            <p>
                Rating: {game.rating ? `${game.rating} (${game.ratings_count} votes)` : 'No rating available'}
            </p>

            <a href={game.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
            
            {game.clip && game.clip.clip && (
                <video controls src={game.clip.clip}></video>
            )}

            <h3>Screenshots</h3>
            <div className="screenshots">
                {Array.isArray(game.screenshots) && game.screenshots.length > 0 
                    ? game.screenshots.map((screenshot) => (
                        <img 
                            key={screenshot.id} 
                            src={screenshot.image} 
                            alt={`Screenshot of ${game.name}`} 
                        />
                    ))
                    : 'No screenshots available'}
            </div>
        </div>
    );
};

export default GameDetail;

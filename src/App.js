import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import './App.css';
import './App.scss';

const API_KEY = 'be95ce6970454524a6fb851e42f0b81d';
const BASE_URL = 'https://api.rawg.io/api/games';

const App = () => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGames, setFilteredGames] = useState([]);

    const fetchGames = async (page = 1) => {
        try {
            const response = await axios.get(`${BASE_URL}?key=${API_KEY}&page_size=27&page=${page}&ordering=-rating`);
            setGames(response.data.results);
            setFilteredGames(response.data.results); // Set filtered games to all initially
        } catch (err) {
            setError('Erreur lors de la récupération des jeux.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, [page]);

    // Update filtered games based on search query
    useEffect(() => {
        if (searchQuery) {
            const results = games.filter(game => 
                game.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredGames(results);
        } else {
            setFilteredGames(games);
        }
    }, [searchQuery, games]);

    const handleGameSelect = (game) => {
        setSelectedGame(game);
    };

    const handleShowMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    if (selectedGame) {
        return <GameDetail game={selectedGame} />;
    }

    return (
        <div className="App">
            <h1>Liste des Jeux</h1>
            <input 
                type="text" 
                placeholder="Rechercher un jeu..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            {loading && <p>Chargement...</p>}
            {error && <p>{error}</p>}
            <GameList games={filteredGames} onGameSelect={handleGameSelect} />
            {filteredGames.length > 0 && !loading && filteredGames.length < 27 && (
                <button onClick={handleShowMore}>Show More</button>
            )}
        </div>
    );
};

export default App;

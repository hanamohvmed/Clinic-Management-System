import React, { useState, useEffect } from 'react';
import { Search, Star, Calendar, Filter, X } from 'lucide-react';
import './MovieDatabaseApp.css'


const MovieDatabase = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // TMDB API key - In production, this should be in environment variables
  const API_KEY = 'c828bf4cc4b6efc587a9c5260f502df9';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  // Popular genres for filtering
  const genres = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 878, name: 'Science Fiction' },
    { id: 53, name: 'Thriller' },
    { id: 10749, name: 'Romance' },
    { id: 16, name: 'Animation' }
  ];

  // Generate years for filter
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // Demo data for when API key is not available
  const demoMovies = [
    {
      id: 1,
      title: "The Matrix",
      overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      vote_average: 8.7,
      release_date: "1999-03-30",
      genre_ids: [28, 878]
    },
    {
      id: 2,
      title: "Inception",
      overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      vote_average: 8.8,
      release_date: "2010-07-16",
      genre_ids: [28, 878, 53]
    },
    {
      id: 3,
      title: "Interstellar",
      overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      vote_average: 8.6,
      release_date: "2014-11-07",
      genre_ids: [18, 878]
    },
    {
      id: 4,
      title: "The Dark Knight",
      overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      vote_average: 9.0,
      release_date: "2008-07-18",
      genre_ids: [28, 18, 80]
    },
    {
      id: 5,
      title: "Pulp Fiction",
      overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      vote_average: 8.9,
      release_date: "1994-10-14",
      genre_ids: [80, 18]
    },
    {
      id: 6,
      title: "Forrest Gump",
      overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
      poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      vote_average: 8.8,
      release_date: "1994-07-06",
      genre_ids: [18, 10749]
    }
  ];

  const fetchMovies = async (searchQuery = '', pageNum = 1) => {
    setLoading(true);
    try {
      let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${pageNum}&sort_by=${sortBy}`;
      
      if (searchQuery) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${pageNum}`;
      }
      
      if (selectedGenre) {
        url += `&with_genres=${selectedGenre}`;
      }
      
      if (selectedYear) {
        url += `&year=${selectedYear}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log('Using demo data - API not available');
      // Filter demo data based on current filters
      let filteredMovies = [...demoMovies];
      
      if (searchQuery) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.overview.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (selectedGenre) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.genre_ids.includes(parseInt(selectedGenre))
        );
      }
      
      if (selectedYear) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.release_date.startsWith(selectedYear)
        );
      }
      
      setMovies(filteredMovies);
      setTotalPages(1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(searchTerm, page);
  }, [searchTerm, selectedGenre, selectedYear, sortBy, page]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setPage(1);
      fetchMovies(searchTerm, 1);
    }
  };

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setSortBy('popularity.desc');
    setSearchTerm('');
    setPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).getFullYear();
  };

  const getGenreNames = (genreIds) => {
    return genreIds.map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.name : '';
    }).filter(Boolean).join(', ');
  };

  return (
    <div className="movie-hub-container">
  {/* Header */}
  <div className="header">
    <div className="header-inner">
      <div className="header-top">
        <h1 className="logo">
          Movie<span className="highlight">Hub</span>
        </h1>
        <button onClick={() => setShowFilters(!showFilters)} className="filter-button">
          <Filter size={20} />
          Filters
        </button>
      </div>
      <div className="search-bar">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          placeholder="Search for movies..."
          className="search-input"
        />
      </div>
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3 className="filters-title">Filters</h3>
            <button onClick={clearFilters} className="clear-filters">
              <X size={16} />
              Clear All
            </button>
          </div>
          <div className="filters-grid">
            <div>
              <label className="label">Genre</label>
              <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="select">
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id} className="option">{genre.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Year</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="select">
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year} className="option">{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select">
                <option value="popularity.desc" className="option">Most Popular</option>
                <option value="vote_average.desc" className="option">Highest Rated</option>
                <option value="release_date.desc" className="option">Newest</option>
                <option value="release_date.asc" className="option">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Movies Grid */}
  <div className="movies-section">
    {loading ? (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    ) : (
      <>
        {movies.length === 0 ? (
          <div className="no-results">
            <p className="no-results-text">No movies found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="poster-container">
                  <img
                    src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/api/placeholder/300/450'}
                    alt={movie.title}
                    className="poster-image"
                  />
                  <div className="poster-overlay" />
                  <div className="rating-badge">
                    <Star size={14} className="star-icon" />
                    <span className="rating-text">
                      {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="movie-details">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-meta">
                    <Calendar size={14} />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                  {movie.genre_ids && (
                    <div className="genre-list">{getGenreNames(movie.genre_ids)}</div>
                  )}
                  <p className="movie-overview">{movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="pagination-button">
              Previous
            </button>
            <span className="pagination-info">Page {page} of {Math.min(totalPages, 20)}</span>
            <button onClick={() => setPage(page + 1)} disabled={page >= Math.min(totalPages, 20)} className="pagination-button">
              Next
            </button>
          </div>
        )}
      </>
    )}
  </div>

  {/* API Key Notice */}
  {API_KEY === 'YOUR_TMDB_API_KEY_HERE' && (
    <div className="api-warning">
      <p className="api-warning-text">
        <strong>Demo Mode:</strong> Replace API_KEY with your TMDB API key for full functionality.
        Get one free at{' '}
        <a href="https://www.themoviedb.org/settings/api" className="api-link" target="_blank" rel="noopener noreferrer">
          TMDB
        </a>
      </p>
    </div>
  )}
</div>
  );
};

export default MovieDatabase;
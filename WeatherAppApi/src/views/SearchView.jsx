import { useState, useEffect, useCallback } from "react";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import { getForecast, getWeather, searchCities } from "../weatherService";
import ErrorModal from "../components/ErrorModal";

function SearchView() {

    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (city.length >= 2) {
                const results = await searchCities(city);
                setSuggestions(results);
                if (results.length > 0) setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [city]);

    const handleSearch = useCallback(async (cityToSearch = city) => {
        try {
            setShowSuggestions(false);
            const weatherData = await getWeather(cityToSearch);
            setWeather(weatherData);

            const { lat, lon } = weatherData.coord;

            const forecastData = await getForecast(lat, lon);
            setForecast(forecastData);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }, [city]);

    const handleSelectCity = (suggestion) => {
        const query = suggestion.state
            ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
            : `${suggestion.name}, ${suggestion.country}`;

        setCity(suggestion.name);
        setShowSuggestions(false);
        handleSearch(suggestion.name);

        fetchByCoords(suggestion.lat, suggestion.lon, suggestion.name);
    };

    const fetchByCoords = async (lat, lon, cityName) => {
        try {
            handleSearch(cityName);
        } catch (e) {
            console.log(e);
            setError(e.message);
        }
    };

    return (
        <div className="container">

            <h1>Szukaj miasta</h1>

            <div style={{ position: 'relative', width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Wpisz miasto"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    style={{ margin: 0, width: '100%' }}
                />

                {showSuggestions && suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li key={`${suggestion.lat}-${suggestion.lon}-${index}`} onClick={() => handleSelectCity(suggestion)}>
                                {suggestion.name} {suggestion.state ? `, ${suggestion.state}` : ''} ({suggestion.country})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button onClick={() => handleSearch()} className="searchButton" style={{ marginTop: '20px' }}>
                Szukaj
            </button>

            <div className="result">
                <WeatherCard data={weather}></WeatherCard>
            </div>

            {forecast && <ForecastList items={forecast.list}></ForecastList>}

            <ErrorModal
                message={error}
                onClose={() => setError(null)}
            />
        </div>
    )
}

export default SearchView;

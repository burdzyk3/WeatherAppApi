import { useReducer, useEffect, useState } from "react";
import { getWeather, getForecast } from "../weatherService";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";

const INITIAL_CITIES = ["Warszawa", "Kraków", "Wrocław", "Gdańsk", "Poznań", "Lubin"];

const getInitialCities = () => {
    const saved = localStorage.getItem('savedCities');
    if (saved) {
        return JSON.parse(saved);
    }
    return INITIAL_CITIES;
};

const initialState = {
    currentIndex: 0,
    weather: null,
    forecast: null,
    loading: true,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "NEXT_CITY":
            return {
                ...state,
                currentIndex: (state.currentIndex + 1) % action.payload.length,
                loading: true,
                error: null,
                weather: null,
                forecast: null
            };
        case "PREV_CITY":
            return {
                ...state,
                currentIndex: (state.currentIndex - 1 + action.payload.length) % action.payload.length,
                loading: true,
                error: null,
                weather: null,
                forecast: null
            };
        case "FETCH_START":
            return {
                ...state,
                loading: true,
                error: null,
                weather: null,
                forecast: null
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                weather: action.payload.weather,
                forecast: action.payload.forecast,
                loading: false,
            };
        case "FETCH_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

function SavedView() {
    const [cities, setCities] = useState(getInitialCities);
    const [newCityName, setNewCityName] = useState("");
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentIndex, weather, forecast, loading, error } = state;
    const currentCity = cities[currentIndex];

    useEffect(() => {
        localStorage.setItem('savedCities', JSON.stringify(cities));
    }, [cities]);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_START" });
            try {
                const weatherData = await getWeather(currentCity);
                const { lat, lon } = weatherData.coord;
                const forecastData = await getForecast(lat, lon);

                dispatch({
                    type: "FETCH_SUCCESS",
                    payload: { weather: weatherData, forecast: forecastData },
                });
            } catch (err) {
                console.error(err);
                dispatch({ type: "FETCH_ERROR", payload: "Nie udało się pobrać danych dla miasta: " + currentCity });
            }
        };

        fetchData();
    }, [currentCity]);

    const handleReplaceCity = () => {
        if (!newCityName.trim()) return;

        const updatedCities = [...cities];
        updatedCities[currentIndex] = newCityName;
        setCities(updatedCities);
        setNewCityName("");
    };

    return (
        <div className="container">
            <h1>Zapisane miasta</h1>

            <div className="carousel-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
                <button onClick={() => dispatch({ type: "PREV_CITY", payload: { length: cities.length } })} className="searchButton">
                    &#8592; Poprzednie
                </button>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {currentCity} ({currentIndex + 1} / {cities.length})
                </span>
                <button onClick={() => dispatch({ type: "NEXT_CITY", payload: { length: cities.length } })} className="searchButton">
                    Następne &#8594;
                </button>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Zmień miasto"
                    value={newCityName}
                    onChange={(e) => setNewCityName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleReplaceCity()}
                    className="searchInput"
                    style={{ margin: 0, width: '200px' }}
                />
                <button onClick={handleReplaceCity} className="searchButton" style={{ margin: 0, padding: '10px 20px' }}>
                    Zmień
                </button>
            </div>

            {loading && <p>Ładowanie danych...</p>}
            {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

            {!loading && !error && weather && (
                <div className="result" style={{ marginTop: '1rem' }}>
                    <WeatherCard data={weather} />
                </div>
            )}

            {!loading && !error && forecast && (
                <ForecastList items={forecast.list} />
            )}
        </div>
    );
}

export default SavedView;

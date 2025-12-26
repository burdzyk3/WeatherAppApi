import { useState } from "react";
import "./App.css";
import { getWeather, getForecast } from "./weatherService";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";

function App() {
	const [city, setCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [forecast, setForecast] = useState(null);

	const handleSearch = async () => {
		try {
			const weatherData = await getWeather(city);
			setWeather(weatherData);

			const { lat, lon } = weatherData.coord;

			const forecastData = await getForecast(lat, lon);
			setForecast(forecastData);

			console.log("Prognoza: ", forecastData);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="container">
			<h1>Aplikacja pogodowa</h1>

			<input
				type="text"
				placeholder="Wpisz miasto"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSearch();
					}
				}}
			/>
			<button onClick={handleSearch} className="searchButton">
				Szukaj
			</button>

			<div className="result">
				<p>Wpisz miasto i kliknij szukaj</p>
				<WeatherCard data={weather}></WeatherCard>
			</div>

			{forecast && <ForecastList items={forecast.list}></ForecastList>}
		</div>
	);
}
export default App;

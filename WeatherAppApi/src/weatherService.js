const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const lang = "pl";
import cities from './assets/cities.json';

export const getWeather = async (city) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Nie znaleziono miasta");
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getForecast = async (lat, lon) => {
	const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${API_KEY}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Nie udało się pobrać prognozy");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};


export const searchCities = async (query) => {
	if (!query || query.length < 2) return [];

	const lowerQuery = query.toLowerCase();

	const results = [];
	for (const city of cities) {
		if (city.s && city.s.startsWith(lowerQuery)) {
			results.push({
				name: city.n,
				lat: city.lat,
				lon: city.lon,
				country: city.c,
				state: city.st
			});
			if (results.length >= 5) break;
		}
	}

	return results;
};

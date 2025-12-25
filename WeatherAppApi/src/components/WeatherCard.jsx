import WeatherInfo from "./WeatherInfo";

function WeatherCard({ data }) {
	if (!data) {
		return null;
	}

	/*
możliwość podglądu szczegółów prognozy pogody dla podanej miejscowości, a w tym:
bieżąca temperatura (w stopniach Celsjusza),
bieżące warunki pogodowe (w formie odpowiedniej ikony),
prognozowana temperatura i warunki pogodowe na najbliższe 5 dni,
prawdopodobieństwo wystąpienia opadów (wyrażona w procentach), ich rodzaj oraz ilość (wyrażona w milimetrach na metr kwadratowy),
prędkość i kierunek wiatru,
stopień zachmurzenia.
    */

	function getWindDirection(deg) {
		const directions = [
			"Północ (N)",
			"Płn-Wsch (NE)",
			"Wschód (E)",
			"Płd-Wsch (SE)",
			"Południe (S)",
			"Płd-Zach (SW)",
			"Zachód (W)",
			"Płn-Zach (NW)",
		];

		const index = Math.round(deg / 45) % 8;

		return directions[index];
	}

	return (
		<div className="weatherCard">
			<h2>Miasto {data.name}</h2>

			<div className="detailsGrid">
				<WeatherInfo
					label="Temperatura: "
					value={Math.round(data.main.temp)}
					unit="Celsjusza"
				/>
				<WeatherInfo label="Pogoda: " value={data.weather[0].main} />
				<WeatherInfo
					label="Opady: "
					value={data.rain?.["1h"] || "Brak opadów"}
				/>
				<WeatherInfo
					label="Wiatr: "
					value2={data.wind.speed}
					unit2="km/h"
					value={getWindDirection(data.wind.deg)}
				/>
				<WeatherInfo label="Zachmurzenie: " value={data.clouds.all} unit="%" />
			</div>
		</div>
	);
}

export default WeatherCard;

import { useSelector } from 'react-redux';
import WeatherInfo from "./WeatherInfo";

function WeatherCard({ data }) {
	const unit = useSelector((state) => state.settings.unit);

	if (!data) {
		return null;
	}

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

	const convertTemp = (temp) => {
		if (unit === 'imperial') {
			return Math.round((temp * 9 / 5) + 32);
		}
		if (unit === 'kelvin') {
			return Math.round(temp + 273.15);
		}
		return Math.round(data.main.temp);
	};

	const getUnitLabel = () => {
		if (unit === 'imperial') return 'Fahrenheit';
		if (unit === 'kelvin') return 'Kelvin';
		return 'Celsjusza';
	};

	const getUnitSymbol = () => {
		if (unit === 'imperial') return '°F';
		if (unit === 'kelvin') return 'K';
		return '°C';
	};

	const unitLabel = getUnitLabel();
	const unitSymbol = getUnitSymbol();

	const precipitations = data.rain?.["1h"] || data.snow?.["1h"];

	return (
		<div className="weatherCard">
			<h2>Miasto {data.name}</h2>

			<div className="detailsGrid">
				<WeatherInfo
					label="Temperatura: "
					value={convertTemp(data.main.temp)}
					unit={unitLabel}
				/>
				<WeatherInfo label="Pogoda: " img={data.weather[0].icon} />
				<WeatherInfo
					label="Opady: "
					value={precipitations ? `${precipitations} mm` : "Brak opadów"}
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

import { useSelector } from 'react-redux';

function ForecastList({ items }) {
	const unit = useSelector((state) => state.settings.unit);

	if (!items || items.length === 0) return null;

	const convertTemp = (temp) => {
		if (unit === 'imperial') {
			return Math.round((temp * 9 / 5) + 32);
		}
		if (unit === 'kelvin') {
			return Math.round(temp + 273.15);
		}
		return Math.round(temp);
	};

	const dailyForecast = items.reduce((acc, item) => {
		const date = item.dt_txt.split(" ")[0];

		if (!acc[date]) {
			acc[date] = {
				date: date,
				min: item.main.temp,
				max: item.main.temp,
				icon: item.weather[0].icon,
			};
		} else {
			acc[date].min = Math.min(acc[date].min, item.main.temp);
			acc[date].max = Math.max(acc[date].max, item.main.temp);

			if (item.dt_txt.includes("12:00:00")) {
				acc[date].icon = item.weather[0].icon;
			}
		}

		return acc;
	}, {});

	const next5Days = Object.values(dailyForecast).slice(0, 5);

	const getDayName = (dateStr) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString("pl-PL", { weekday: "long" });
	};

	return (
		<div className="forecastContainer">
			<h3>Prognoza na 5 dni</h3>
			<div className="list">
				{next5Days.map((day) => (
					<div className="forecastItem" key={day.date}>
						<p className="day-name">{getDayName(day.date)}</p>

						<img
							src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
							alt="ikona"
							style={{ width: "50px" }}
						/>

						<div className="temp-range">
							<span className="max">{convertTemp(day.max)}°</span>
							<span className="separator"> / </span>
							<span className="min">{convertTemp(day.min)}°</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ForecastList;

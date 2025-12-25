function WeatherInfo({ label, value, unit, value2, unit2 }) {
	return (
		<div className="infoTile">
			<span className="infoLabel">{label}</span>
			<p className="infoValue">
				{value} <small> {unit}</small>
				{value2} <small>{unit2}</small>
			</p>
		</div>
	);
}

export default WeatherInfo;

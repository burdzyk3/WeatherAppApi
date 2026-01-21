function WeatherInfo({ label, value, unit, value2, unit2, img }) {
	return (
		<div className="infoTile">
			<span className="infoLabel">{label}</span>
			<p className="infoValue">
				{value} <small> {unit}</small>
				{value2} <small>{unit2}</small>
				<img src={`https://openweathermap.org/img/wn/${img}@2x.png`} alt="" />
			</p>
		</div>
	);
}

export default WeatherInfo;


function WeatherCard({data}){
    if(!data){
        return null;
    }

    return(
        <div className="weatherCard">
            <h2>Miasto {data.name}</h2>

            <p className = "temp">
                {Math.round(data.main.temp)} Celsjusza
            </p>

            <p className = "description">
                {data.weather[0].description}
            </p>
        </div>
    )
}

export default WeatherCard;
import {useState} from "react";
import "./App.css";
import { getWeather } from "./weatherService";
import WeatherCard from "./components/WeatherCard";


function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    
    const handleSearch =  async () => {
        try{
            const data = await getWeather(city);
            setWeather(data);
        }catch(err){
            console.log(err);
        }
    }


return(
    <div className="container">
        <h1>Aplikacja pogodowa</h1>

        <input type="text" placeholder="Wpisz miasto" value={city} onChange={(e) => setCity(e.target.value)}/>
        <button onClick={handleSearch}>Szukaj</button>

        <div className="result">
            <p>Wpisz miasto i kliknij szukaj</p>
            <WeatherCard data={weather}></WeatherCard>
        </div> 
    </div>
)
}
export default App; 
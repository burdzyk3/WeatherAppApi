const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY ;
const lang = "pl"

export const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`


try{
    const response = await fetch(url);

    if (!response.ok){
        throw new Error("Nie znaleziono miasta");
    }

    const data = await response.json();

    return data;
    
}catch(error){
    console.error(error);
    throw error;
}
}



// Zmienne z API 

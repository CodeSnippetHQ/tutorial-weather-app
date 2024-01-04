// open weather docs: https://openweathermap.org/current

import * as dotenv from "dotenv";

dotenv.config();

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

export async function getCurrentWeather(lat, lon) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`);

        if (!res.ok) {
            throw new HttpError(res.status, res.statusText);
        }

        const data = await res.json();
        return {
            // get the city name
            city: data.name,
            // generate the icon url from the icon code
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
            // get the weather description
            description: data.weather[0].main,
            // get the current temp
            currentTemp: Math.trunc(data.main.temp),
            // get the min temp
            minTemp: Math.trunc(data.main.temp_min),
            // get the max temp
            maxTemp: Math.trunc(data.main.temp_max),
        }
    } catch (err) {
        throw err;
    }
}

// add a custom error class to handle http errors
// so that we can use the http status code in our response
export class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}


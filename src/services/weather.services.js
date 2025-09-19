const API_KEY = process.env.OWM_API_KEY;


async function getWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset`;

    const weatherDescriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm (slight or moderate)",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const code = data.daily?.weathercode?.[0] ?? null;

        const todayWeather = {
            weatherCode: code,
            weatherDescription: code !== null ? weatherDescriptions[code] ?? "Unknown" : null,
            maxTemperature: data.daily?.temperature_2m_max?.[0] ?? null,
            minTemperature: data.daily?.temperature_2m_min?.[0] ?? null,
            precipitationSum: data.daily?.precipitation_sum?.[0] ?? null,
            sunrise: data.daily?.sunrise?.[0] ?? null,
            sunset: data.daily?.sunset?.[0] ?? null
        };

        return todayWeather;

    } catch (error) {
        console.error('Error fetching daily weather:', error);
        return null;
    }
}

async function getWeatherAlerts(lat, lon) {
    const weatherAlertUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const resp = await fetch(weatherAlertUrl);
    const data = await resp.json();
    const res = data.alerts || "No alerts";

    return res;
}

async function getDailyWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // take first item from daily arrays as “today”
        const todayWeather = {
            maxTemperature: data.daily?.temperature_2m_max?.[0] ?? null,
            minTemperature: data.daily?.temperature_2m_min?.[0] ?? null,
            precipitationSum: data.daily?.precipitation_sum?.[0] ?? null,
            sunrise: data.daily?.sunrise?.[0] ?? null,
            sunset: data.daily?.sunset?.[0] ?? null
        };

        return todayWeather;

    } catch (error) {
        console.error('Error fetching daily weather:', error);
        return null;
    }
}
console.log(await getWeather(9.9312, 76.2673));

async function getWeather(lat, lon) {
    const API_KEY = process.env.OWM_API_KEY;
    
    const now = new Date();
    const archiveYear =
        now.getMonth() !== 11 || now.getDate() !== 31
            ? now.getFullYear() - 1
            : now.getFullYear();
    const startDate = `${archiveYear}-01-01`;
    const endDate = `${archiveYear}-12-31`;

    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset`;
    const archiveUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=precipitation_sum&timezone=auto`;

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
        const [forecastRes, archiveRes] = await Promise.all([
            fetch(forecastUrl),
            fetch(archiveUrl)
        ]);

        if (!forecastRes.ok)
            throw new Error(
                `Forecast HTTP error! status: ${forecastRes.status}`
            );
        if (!archiveRes.ok)
            throw new Error(`Archive HTTP error! status: ${archiveRes.status}`);

        const forecastData = await forecastRes.json();
        const archiveData = await archiveRes.json();

        const code = forecastData.daily?.weathercode?.[0] ?? null;
        const todayWeather = {
            weatherCode: code,
            weatherDescription:
                code !== null ? (weatherDescriptions[code] ?? "Unknown") : null,
            maxTemperature: forecastData.daily?.temperature_2m_max?.[0] ?? null,
            minTemperature: forecastData.daily?.temperature_2m_min?.[0] ?? null,
            precipitationSum:
                forecastData.daily?.precipitation_sum?.[0] ?? null,
            sunrise: forecastData.daily?.sunrise?.[0] ?? null,
            sunset: forecastData.daily?.sunset?.[0] ?? null
        };

        const dailyRain = archiveData.daily?.precipitation_sum ?? [];
        const totalAnnualRainfall = Number(
            dailyRain.reduce((acc, val) => acc + (val ?? 0), 0).toFixed(2)
        );

        return {
            ...todayWeather,
            annualRainfall: totalAnnualRainfall
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
}

async function getWeatherAlerts(lat, lon) {
    const API_KEY = process.env.OWM_API_KEY;
    const weatherAlertUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const resp = await fetch(weatherAlertUrl);
    const data = await resp.json();
    const res = data.alerts || "No weather alerts";

    return res;
}

export { getWeather, getWeatherAlerts };

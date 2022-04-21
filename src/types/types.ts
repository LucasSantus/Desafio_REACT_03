export interface ForecastInterface {
    date: string;
    weekday: string;
    max: string;
    min: string;
    description: string;
    condition: string;
}

export interface WeatherInterface {
    temp: number;
    date: string;
    time: string;
    condition_code: string;
    description: string;
    currently: string;
    cid: string;
    city: string;
    img_id: string;
    humidity: number;
    wind_speedy: string;
    sunrise: string;
    sunset: string;
    condition_slug: string;
    city_name: string;
    forecast: ForecastInterface[];
    latitude: number;
    longitude: number;
}
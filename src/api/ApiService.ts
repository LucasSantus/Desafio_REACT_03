import axios from 'axios';

const url = 'https://aps-weather-app.herokuapp.com';

export const ApiService = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
});
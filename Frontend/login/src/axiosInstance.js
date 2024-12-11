// src/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // URL del backend desde el .env
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;

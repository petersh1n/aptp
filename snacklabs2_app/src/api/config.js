import axios from 'axios';

export const API = axios.create({
    baseURL: 'http://localhost:8000',  // Django 서버 주소
    headers: {
        'Content-Type': 'application/json',
    },
}); 
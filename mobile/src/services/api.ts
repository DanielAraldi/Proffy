import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.109:3333' // http colocando no lugar do exp e o 19000 trocado pela por do server
});

export default api;
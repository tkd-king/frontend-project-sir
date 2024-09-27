import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

export default instance;
//yay mn utils bni the cors k error ko solve krnay k leay but mn
// service kay folder mn variable mn linkaddress store kr k
// use kia h 
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-d6826.firebaseio.com'
});

export default instance;
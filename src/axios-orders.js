import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://academind-dummy.firebaseio.com/'
});

export default instance;
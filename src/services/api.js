import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://reecho-env.eba-bk9ugpha.eu-west-1.elasticbeanstalk.com/'
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default instance;

import axios from 'axios';
import md5 from 'md5';

const apiUrl = 'http://api.valantis.store:40000';
const apiPassword = 'Valantis';

const config = {
  baseURL: apiUrl,
};

export const api = axios.create(config);

api.interceptors.request.use((config) => {
  config.headers['x-auth'] = md5(`${apiPassword}_${getTimeStamp()}`);
  return config;
});

function getTimeStamp() {
  const date = Intl.DateTimeFormat('ru', {
    dateStyle: 'short',
  }).format(new Date());

  const [day, month, year] = date.split('.');

  return `${year}${month}${day}`;
}

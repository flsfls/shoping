import axios from 'axios';

// const baseUrl = 'http://172.168.168.234:3000';
const baseUrl = 'http://localhost:3000';

const parseUrl = (url, params = {}) => {
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`;    // eslint-disable-line
    return result;
  }, '');
  return `${baseUrl}/${url}?${str.substr(0, str.length - 1)}`;
};


export const get = (url, params) =>
  new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params))
      .then(({ data }) => {
        if (data && data.success === true) {
          resolve(data);
        } else {
          reject(data);
        }
      }).catch(reject);
  });


export const post = (url, params, datas) =>
  new Promise((resolve, reject) => {
    axios.post(parseUrl(url, params), datas)
      .then(({ data }) => {
        if (data && data.success === true) {
          resolve(data);
        } else {
          reject(data);
        }
      }).catch(reject);
  });

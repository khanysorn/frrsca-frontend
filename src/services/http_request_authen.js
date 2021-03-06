import axios from 'axios'
import { getToken } from '../helper'

let axiosInstance = axios.create({
  baseURL: 'https://gatewayservice.sit.kmutt.ac.th/',
  timeout: 120000,
  headers: { "Access-Control-Allow-Origin": true }
})

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

const configWithBearerToken = (config = {}) => ({...config,headers: {
  Authorization: `Bearer ${getToken()}`
} })

class HttpRequest {
  constructor () {
    this.axios = axios
  }

  setHeader (header) {
    axiosInstance.defaults.headers.common[header.key] = header.value
    axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  get (methodName, data, useToken = false) {
    const config = { params: data }
    if (useToken) {
      config.headers = {
        Authorization: `Bearer ${getToken()}`
      }
    }
    return axiosInstance.get(methodName, config)
  }

  post (methodName, data, useToken = false) {
    const config = useToken ? configWithBearerToken(data) : { data }
    return axiosInstance.post(methodName, data, config)
  }

  put (methodName, data) {
    return axiosInstance.put(methodName, data)
  }

  delete (methodName, id) {
    return axiosInstance.delete(methodName, { params: {id: id} })
  }

  request (type, url, data) {
    let promise = null
    switch (type) {
      case 'GET': promise = axios.get(url, { params: data }); break
      case 'POST': promise = axios.post(url, data); break
      case 'PUT': promise = axios.put(url, data); break
      case 'DELETE': promise = axios.delete(url, data); break
      default : promise = axios.get(url, { params: data }); break
    }
    return promise
  }
}

export default HttpRequest

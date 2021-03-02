import axios from 'axios'

/**
 * Axios defaults
 */
// axios.defaults.baseURL = 'http://149.28.158.115:3000'
// axios.defaults.baseURL = 'http://125.212.235.135:33000/api'
// axios.defaults.baseURL = 'http://eps-api.2soft.top/api'
axios.defaults.baseURL = 'http://192.168.1.149:3000/api'

// Headers
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.timeout = 10000

/**
 * Request Interceptor
 */
axios.interceptors.request.use(
  async (inputConfig) => {
    const config = inputConfig

    // Check for and add the stored Auth Token to the header request
    let token = ''
    try {
      token = await localStorage.getItem('token') || ''
    } catch (error) {
      /* Nothing */
    }
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    throw error
  },
)

/**
 * Response Interceptor
 */
axios.interceptors.response.use(
  (res) => {
    // Status code isn't a success code - throw error
    if (!`${res.status}`.startsWith('2')) {
      throw res.data
    }

    // Otherwise just return the data
    return res
  },
  (error) => {
    // Pass the response from the API, rather than a status code
    if (error && error.response && error.response.data) {
      throw error.response.data
    }
    throw error
  },
)

export default axios

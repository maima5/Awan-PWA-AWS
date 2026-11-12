import axios from 'axios'

// Semua request ke backend lewat instance ini.
// URL backend diambil dari file .env (VITE_API_URL)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000
})

// Kalau nanti pakai Cognito, token login otomatis dikirim di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api

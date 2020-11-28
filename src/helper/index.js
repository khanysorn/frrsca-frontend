import { FRRSCA_BASE_URL } from '../services/config'

export const setToken = token => localStorage.setItem("token", token)
export const getToken = () => localStorage.getItem("token") || ''
export const setUser = user => localStorage.setItem("user", JSON.stringify(user))
export const getUser = () => JSON.parse(localStorage.getItem("user"))

// Upload File
export const getUploadImageURL = () => {
  // get user_id
  const user_id = getUser().user_id

  // return url
  const url = `${FRRSCA_BASE_URL}/api/v1/class/attendance/student/image/${user_id}`
  console.log(url)
}
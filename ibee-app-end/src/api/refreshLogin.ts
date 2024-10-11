import api from './index'

export const refreshLogin = async () => {
  try {
    const res = await api.get('/user/refreshLoginDays')
    return res.data
  } catch (err) {
    console.log(err)
  }
}
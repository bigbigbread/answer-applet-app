import api from './index'
interface LoginResParams {
  statusCode: number
  statusMsg: string
  data: string
}
export const userLogin = async (params: string): Promise<string> => {
  try {
    const res: LoginResParams = await api.get('/admin/token/create', {
      params: {
        password: params
      }
    })
    if (res.statusCode === 1 && res.data) {
      localStorage.setItem('token', res.data)
      return 'success'
    } else {
      // 登录失败
      return 'fail'
    }
  } catch (e) {
    console.log(e)
    return 'error'
  }
}

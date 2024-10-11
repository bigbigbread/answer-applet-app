import api from './index'
import { LoginRes } from './type'
const getWechatCode = async ():Promise<LoginRes> => {
  return new Promise((resolve, reject) => {
		uni.login({
			provider: "weixin",
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			},
		})
	})
}

export const loginInit = async () => {
  try {
		const loginRes: LoginRes = await getWechatCode()
		console.log('loginRes',loginRes)
    const { errMsg, code } = loginRes
    if (code && ["login:ok"].includes(errMsg)) {
			let openIdRes: any = await getWechatOpenIdByCode({ "loginCode": code })
			console.log('openIdRes',openIdRes.data)
			uni.setStorageSync('token', openIdRes.data.token)
		}
  } catch (err) {
		console.log(err)
  }
}

const getWechatOpenIdByCode = async (paramList: any)  => {
	try {
		const res = await api.get('/user/token/create', undefined, {
			params: paramList
		})
		return res.data
	} catch (error) {
		console.log(error)
	}
}
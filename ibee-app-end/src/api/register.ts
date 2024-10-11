import api from "./index"
// import axios from "axios"
import { registerUserParam } from "./type"
export const registerUser = async (params:registerUserParam,ImgBuffer:Uint8Array) => {
	try {
			console.log("请求前params123",params)
			console.log("请求前ImgBuffer123", ImgBuffer)
			const body = new DataView(ImgBuffer.buffer)
			const res = await api.post("/user/register", body.buffer, {
					params: params,
			})
			console.log("请求后", res)			
	} catch (err) {
			console.log('出错辣')
			console.log('服务器',err)
		}
}

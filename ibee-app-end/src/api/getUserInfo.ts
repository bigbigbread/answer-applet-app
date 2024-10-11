import api from './index'

export const getUserInfo = async () => {
  try {
    const res = await api.get('/user/getInfo')
    if (res.data.statusCode === 1) {
      return res.data
    } else {
      return false
    }
  } catch(err) {
    console.log(err)
    return false
  }
}

// export const getUserAvter = async (userId:string) => {
//   return new Promise((resolve, reject) => {
//     uni.request({
//       url: `https://ibee-calculus-site.oss-rg-china-mainland.aliyuncs.com/headImage/${userId}`,
//       method: 'GET',
//       responseType: "arraybuffer",
//       success: (res:any) => {
//         // 转化成base64
//         const base64 = uni.arrayBufferToBase64(res.data)
//         resolve(`data:image/jpeg;base64,${base64}`)
//       },
//       fail: (err) => {
//         console.log(err)
//         reject(err)
//       },
//       complete: () => {}
//     })
//   })
// }
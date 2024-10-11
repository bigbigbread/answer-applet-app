export const PREFIX = 'https://ibee-calculus-site.oss-rg-china-mainland.aliyuncs.com'
// import { get } from './request'
export const getHeadImgUrl = (userId: string) => {
  return `${PREFIX}/head-image/${userId}`
}
export const getProblemImgUrl = (problemId: string, type: number) => {
  return `${PREFIX}/problem/${problemId}/${type}`
}

const getBase64 = (url: string) => { 
  return new Promise((resolve, reject) => { 
    uni.request({
      url: url,
      method: 'GET',
      responseType: 'arraybuffer',
      success: (res:any) => {
        const base64 = uni.arrayBufferToBase64(res.data)
        console.log('Img',base64)
        // return base64
        resolve(base64)
      },
      fail: (err:any) => {
        reject(err)
      },
    })
  })
}
// 获取用户头像的base64 便于在页面上显示
export const getUserHeadImgBase64 = async (userId: string) => {
  const res = await getHeadImgUrl(userId)
  return await getBase64(res)
}
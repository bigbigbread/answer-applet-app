import type { RcFile, UploadFile } from 'antd/es/upload/interface'

/**
 *@param file {Object} 上传的文件
 *@returns {void}
 *@author yueyun <2023/10/06>
 * */
export const onPreview = async (file: UploadFile) => {
  let src = file.url as string
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file.originFileObj as RcFile)
      reader.onload = () => resolve(reader.result as string)
    })
  }
  const image = new Image()
  image.src = src
  const imgWindow = window.open(src)
  imgWindow?.document.write(image.outerHTML)
}

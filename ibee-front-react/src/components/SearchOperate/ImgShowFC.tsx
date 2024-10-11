import React from 'react'
import type { UploadFile } from 'antd/es/upload/interface'
import { message } from 'antd'
/**
 *@param newFileList {Array} 上传的文件列表
 *@param setFileList {Function} 设置上传的文件列表
 *@param imgName {String} 图片名字
 *@returns {void}
 *@author 月晕 <2023/10/06>
 * */
export const onChangeFC = (
  newFileList: UploadFile[],
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>,
  imgName: string
) => {
  setFileList(newFileList)
  // 更改图片名字
  if (!newFileList.length) return
  if (imgName === '题目内容') {
    newFileList[0].name = 'content.png'
  } else if (imgName === '题目解析') {
    newFileList[0].name = 'analysis.png'
  } else {
    newFileList[0].name = 'answer.png'
  }
}

/**
 * @param file {Object} 上传的文件
 * @param setFileList {Function} 设置上传的文件列表
 * @returns {Boolean} 是否上传成功
 * @description 上传图片前的校验
 * @authur 月晕 <2023/10/06>
 * */
export const beforeUploadFC = (
  file: any,
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>
) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
    setTimeout(() => {
      setFileList([])
    }, 1000)
  }
  const isLt2M = file.size / 1024 / 1024 < 1.5
  if (!isLt2M) {
    message.error('Image must smaller than 1.5MB!')
    setTimeout(() => {
      setFileList([])
    }, 1000)
  }
  return isJpgOrPng && isLt2M
}

// 拆分代码 主要写Search.tsx中的函数行为
import React from 'react'
import classes from './search.module.less'
import { Select, Input, message } from 'antd'
import { createProblem, uploadProblemPic } from '@/api/problem'
/**
 * 搜索栏的配置项的类型
 * */
interface SearchItem {
  name: string
  type: string
  comp: JSX.Element
}
/**
 * 题目信息的类型
 * */
export interface UploadProblemData {
  id: string
  leve: number
  source: string
  remark: string
}
/**
 * 题目图片的类型
 * */
export interface ProblemImg {
  content: Uint8Array
  answer: Uint8Array
  analysis: Uint8Array
}
/**
 * 搜索栏的配置项
 * */
export const searchItem: Array<SearchItem> = [
  {
    name: '题目编号',
    type: 'input',
    comp: <Input className={classes.InputCommon}></Input>
  },
  {
    name: '难度',
    type: 'select',
    comp: <Select className={classes.SelectCommon} size="small"></Select>
  },
  {
    name: '类型',
    type: 'select',
    comp: <Select className={classes.SelectCommon} size="small"></Select>
  },
  {
    name: '题源',
    type: 'input',
    comp: <Input className={classes.InputCommon} />
  },
  {
    name: '备注',
    type: 'input',
    comp: <Input className={classes.InputCommon} />
  },
  {
    name: '录题人',
    type: 'input',
    comp: <Input className={classes.InputCommon} />
  }
]

/**
 *@param uploadProblmData {Object} 题目信息
 *@param setUploadProblmData {Function} 设置题目信息
 *@param setIsModalOpen {Function} 设置是否打开modal
 *@param setIsUpdate {Function} 设置是否更新题目列表
 *@param setIsImgModal {Function} 设置是否打开图片modal
 *@param setNowProblemId {Function} 设置当前题目id
 *@returns {Function} 处理ok按钮的函数
 *@author yueyun <2023/10/06> <apprehensive639@gmail.com>
 * */
export const handleOkFc = async (
  uploadProblmData: UploadProblemData,
  setUploadProblmData: React.Dispatch<React.SetStateAction<UploadProblemData>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImgModal: React.Dispatch<React.SetStateAction<boolean>>,
  setNowProblemId: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const problemId = await createProblem({
      level: uploadProblmData.leve,
      source: uploadProblmData.source,
      noteInfo: uploadProblmData.remark
    })
    setNowProblemId(problemId)
    if (problemId === 'error') {
      message.error('创建题目失败')
      return
    }
  } catch (error) {
    message.error('创建题目失败，网络出现错误')
    return
  }
  setIsModalOpen(false)
  message.success('创建已经创建题目成功')
  // 刷新题目列表
  // 然后 uploadProblemImg 打开第二个modal
  setIsUpdate(true)
  setTimeout(() => {
    setIsImgModal(true)
  }, 500)
  // 清空数据
  setUploadProblmData({
    id: '',
    leve: 1,
    source: '',
    remark: ''
  })
}

/**
 *@param shouldSendRequest {Boolean} 是否发送请求
 *@param problemImg {Object} 题目图片
 *@param nowProblemId {String} 当前题目id
 *@param setIsClear {Function} 设置是否清空图片
 *@param setShouldSendRequest {Function} 设置是否发送请求
 *@param setIsImgModal {Function} 设置是否打开图片modal
 *@param setProblemImg {Function} 设置图片
 *@returns {Function} 处理上传图片的函数
 *@description 上传图片的函数，上传图片的时候，需要判断是否有图片，如果没有图片，就不发送请求
 *@author 月晕 <2023/10/06>
 * */
export const uploadProblemImg = async (
  shouldSendRequest: boolean,
  problemImg: ProblemImg,
  nowProblemId: string,
  setIsClear: React.Dispatch<React.SetStateAction<boolean>>,
  setShouldSendRequest: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImgModal: React.Dispatch<React.SetStateAction<boolean>>,
  setProblemImg: React.Dispatch<React.SetStateAction<ProblemImg>>,
  init: any,
  changeUpdate: any
) => {
  if (shouldSendRequest) {
    try {
      console.log('校验前problemImg', problemImg)
      // 校验是否存在图片
      if (
        problemImg.content.length === 0 ||
        problemImg.answer.length === 0 ||
        problemImg.analysis.length === 0
      ) {
        message.warning('请上传题目图片的内容、答案、解析')
        return
      }
      const contentRes = await uploadProblemPic(
        {
          problemId: nowProblemId,
          imageTypeNumber: 0
        },
        problemImg.content
      )
      // console.log(contentRes)
      if (contentRes === 'error') {
        setIsClear(true)
        message.error('上传题目内容图片失败')
        return
      } else if (contentRes === 'fail') {
        setIsClear(true)
        message.error('上传题目内容图片失败')
        return
      }
      const answerRes = await uploadProblemPic(
        {
          problemId: nowProblemId,
          imageTypeNumber: 2
        },
        problemImg.answer
      )
      if (answerRes === 'error') {
        setIsClear(true)
        message.error('上传题目答案图片失败')
        return
      } else if (answerRes === 'fail') {
        message.error('上传题目答案图片失败')
        setIsClear(true)
        return
      }
      const analysisRes = await uploadProblemPic(
        {
          problemId: nowProblemId,
          imageTypeNumber: 1
        },
        problemImg.analysis
      )
      if (analysisRes === 'error') {
        message.error('上传题目解析图片失败')
        setIsClear(true)
        return
      } else if (analysisRes === 'fail') {
        message.error('上传题目解析图片失败')
        setIsClear(true)
        return
      }
      setShouldSendRequest(false)
      init()
      message.success('上传题目图片成功')
      setIsClear(true)
      setIsImgModal(false)
      // 清空数据
      // 清空Img
      setProblemImg({
        content: new Uint8Array(),
        answer: new Uint8Array(),
        analysis: new Uint8Array()
      })
      // 刷新题目列表
      changeUpdate(true)
    } catch (error) {
      console.log(error)
      message.error('上传题目内容图片失败')
      setIsClear(true)
      return
    }
  }
}

/**
 * @param imgName {String} 图片的名字
 * @param imgBinaryData {Object} 图片的二进制数据
 * @param problemImg {Object} 题目图片
 * @param setProblemImg {Function} 设置题目图片
 * @description 处理上传图片的函数，将图片的二进制数据存储到题目图片中
 * @returns {Function} 处理上传图片的函数
 * @author 月晕 <2023/10/06>
 * */
export const getImgPropsFc = (
  imgName: string,
  imgBinaryData: any,
  problemImg: ProblemImg,
  setProblemImg: React.Dispatch<React.SetStateAction<ProblemImg>>
) => {
  if (imgName === '题目内容') {
    setProblemImg({
      ...problemImg,
      content: imgBinaryData
    })
  } else if (imgName === '题目解析') {
    setProblemImg({
      ...problemImg,
      analysis: imgBinaryData
    })
  } else {
    setProblemImg({
      ...problemImg,
      answer: imgBinaryData
    })
  }
}

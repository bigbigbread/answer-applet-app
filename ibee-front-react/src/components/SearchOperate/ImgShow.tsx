import React, { useState, useEffect } from 'react'
import ImgCrop from 'antd-img-crop'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import classes from './ImgShow.module.less'
import { onPreview } from '@/utils/index'
import { ProblemImg } from './searchFC'
import { onChangeFC, beforeUploadFC } from './ImgShowFC'
import './ImgShow.less'
interface ImgShowProps {
  imgName: string
  uploadFile: (
    imgName: string,
    imgBinaryData: any,
    problemImg: ProblemImg,
    setProblemImg: React.Dispatch<React.SetStateAction<ProblemImg>>
  ) => void
  isClear: boolean
  changeClear: () => void
  problemImg: ProblemImg
  setProblemImg: React.Dispatch<React.SetStateAction<ProblemImg>>
}
const ImgShow: React.FC<ImgShowProps> = (props: ImgShowProps) => {
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    onChangeFC(newFileList, setFileList, props.imgName)
  }
  useEffect(() => {
    if (props.isClear) {
      setFileList([])
      props.changeClear()
    }
  }, [props.isClear])
  const [fileList, setFileList] = useState<UploadFile[]>([])
  return (
    <div className={classes['ImgShow-content']}>
      <div className={classes['ImgShow-title']}>{props.imgName}</div>
      <ImgCrop
        rotationSlider
        aspect={16 / 9}
        quality={1}
        modalWidth="60%"
        modalTitle="裁剪图片"
      >
        <Upload
          className={classes['ImgShow-upload']}
          listType="picture"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          maxCount={1}
          onRemove={() => {
            console.log('remove')
          }}
          beforeUpload={(file) => {
            // 如果是图片，就返回true，否则返回false
            return beforeUploadFC(file, setFileList)
          }}
          customRequest={async (options: any) => {
            const { file, onSuccess, onError } = options as any
            // 将这个文件图片转化成二进制的形式
            const reader = new FileReader()
            reader.readAsArrayBuffer(file as Blob)
            reader.onload = (e: any) => {
              const imgBinaryData = new Uint8Array(e.target.result)
              if (imgBinaryData.length) {
                // console.log(imgBinaryData)
                props.uploadFile(
                  props.imgName,
                  imgBinaryData,
                  props.problemImg,
                  props.setProblemImg
                )
                onSuccess('ok')
              } else {
                console.log('error')
                onError('error')
              }
            }
          }}
        >
          {fileList.length < 1 && (
            <div
              style={{
                width: '100%',
                height: '100%'
              }}
            >
              <Button
                icon={<UploadOutlined className={classes['upload-icon']} />}
                className={classes['upload-btn']}
              >
                Upload
              </Button>
            </div>
          )}
        </Upload>
      </ImgCrop>
    </div>
  )
}

export default ImgShow
